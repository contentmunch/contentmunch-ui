import * as React from "react";
import type {VisualizationProps} from "./dataset/Dataset.ts";
import {colorHex} from "./dataset/colors.ts";
import {validateFor} from "./dataset/validate.ts";
import {kpiModel} from "./adapters/kpi.ts";
import {Figure} from "./parts/Figure.tsx";

/** A KPI shows one period (the latest unless given) and takes no selection. */
export type KpiChartProps = Pick<VisualizationProps, "data" | "size" | "period">;

const SPARK_W = 160;
const SPARK_H = 36;
const ARROW = { up: "\u25B2", down: "\u25BC", flat: "\u25AC" } as const;

/** What is the number, and which way is it heading? The latest value, the change from the period before, and the history. */
export const KpiChart: React.FC<KpiChartProps> = ({ data, size = "medium", period }) => {
    const problems = validateFor("kpi", data);
    const model = problems.length === 0 ? kpiModel(data, period) : null;
    return (
        <Figure data={data} size={size} kind="kpi" problems={problems}>
            {model && (() => {
                const max = Math.max(...model.history, 0);
                const min = Math.min(...model.history, 0);
                const span = max - min || 1;
                const points = model.history.map((v, i) => {
                    const px = model.history.length === 1 ? SPARK_W / 2 : (i / (model.history.length - 1)) * SPARK_W;
                    return `${px},${SPARK_H - 3 - ((v - min) / span) * (SPARK_H - 6)}`;
                });
                return (
                    <div className="muncher-kpi">
                        <span className="muncher-kpi-label">{model.label}{model.periodText && ` \u00B7 ${model.periodText}`}</span>
                        <span className="muncher-kpi-value">{model.valueText}</span>
                        {model.change && (
                            <span className="muncher-kpi-change">
                                <span aria-hidden="true">{ARROW[model.change.direction]}</span>{" "}
                                {model.change.deltaText}{model.change.percentText && ` (${model.change.percentText})`} from {model.change.againstText}
                            </span>
                        )}
                        {model.history.length > 1 && (
                            <svg className="muncher-kpi-history" viewBox={`0 0 ${SPARK_W} ${SPARK_H}`} aria-hidden="true">
                                <polyline points={points.join(" ")} fill="none" stroke={colorHex(model.color)} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        )}
                    </div>
                );
            })()}
        </Figure>
    );
};
