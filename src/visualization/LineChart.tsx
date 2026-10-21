import * as React from "react";
import type {VisualizationProps} from "./dataset/Dataset.ts";
import {colorHex} from "./dataset/colors.ts";
import {validateFor} from "./dataset/validate.ts";
import {lineModel} from "./adapters/line.ts";
import {canonicalPeriod, shapeOf} from "./dataset/derive.ts";
import {Figure} from "./parts/Figure.tsx";
import {Legend} from "./parts/Legend.tsx";

/** Lines take no selection. They draw every period; a `period` only marks one with a cursor. */
export type LineChartProps = Pick<VisualizationProps, "data" | "size" | "legend" | "period">;

const WIDTH = 580;
const HEIGHT = 300;
const TOP = 14;
const RIGHT = 24;
const BOTTOM = 40;
const TICK = 5;
const CHAR = 5.6;

/** How did this change over time? One line per measure, or per value of the category; the axis starts at zero. */
export const LineChart: React.FC<LineChartProps> = ({ data, size = "medium", legend = true, period }) => {
    const problems = validateFor("line", data);
    const model = problems.length === 0 ? lineModel(data) : null;
    return (
        <Figure data={data} size={size} kind="line" problems={problems} empty={model !== null && model.series.length === 0}>
            {model && (() => {
                const left = Math.max(...model.tickTexts.map((t) => t.length), 3) * CHAR + 16;
                const plotW = WIDTH - left - RIGHT;
                const plotH = HEIGHT - TOP - BOTTOM;
                const n = model.periods.length;
                const x = (i: number) => left + (n === 1 ? plotW / 2 : (i / (n - 1)) * plotW);
                const y = (v: number) => TOP + plotH - (model.max > 0 ? (v / model.max) * plotH : 0);
                const labelWidth = Math.max(...model.labels.map((l) => l.length), 1) * CHAR + 12;
                const every = Math.max(1, Math.ceil((labelWidth * n) / plotW));
                const grain = shapeOf(data).time?.grain ?? "month";
                const marked = period ? model.periods.indexOf(canonicalPeriod(period, grain) ?? "") : -1;
                return (
                    <div className="muncher-line-chart">
                        <svg className="svg-line-chart" viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
                            <g className="axis">
                                <line x1={left} x2={left} y1={TOP} y2={TOP + plotH}/>
                                <line x1={left} x2={left + plotW} y1={TOP + plotH} y2={TOP + plotH}/>
                                {model.ticks.map((t, i) => (
                                    <g key={t}>
                                        <line x1={left - TICK} x2={left} y1={y(t)} y2={y(t)}/>
                                        <text x={left - TICK - 4} y={y(t)} textAnchor="end" dominantBaseline="central">{model.tickTexts[i]}</text>
                                    </g>
                                ))}
                                {model.periods.map((p, i) => (
                                    <g key={p}>
                                        <line x1={x(i)} x2={x(i)} y1={TOP + plotH} y2={TOP + plotH + TICK}/>
                                        {i % every === 0 && <text x={x(i)} y={TOP + plotH + TICK + 13} textAnchor={i === n - 1 && n > 1 ? "end" : "middle"}>{model.labels[i]}</text>}
                                    </g>
                                ))}
                            </g>
                            {marked >= 0 && <line className="line-cursor" x1={x(marked)} x2={x(marked)} y1={TOP} y2={TOP + plotH}/>}
                            {model.series.map((s) => {
                                const color = colorHex(s.color);
                                const runs: string[] = [];
                                let current = "";
                                s.points.forEach((p, i) => {
                                    if (p.value === null) {
                                        if (current) runs.push(current);
                                        current = "";
                                    } else {
                                        current += `${current ? "L" : "M"}${x(i)},${y(p.value)}`;
                                    }
                                });
                                if (current) runs.push(current);
                                const last = [...s.points].reverse().findIndex((p) => p.value !== null);
                                const lastIndex = last < 0 ? -1 : s.points.length - 1 - last;
                                return (
                                    <g key={s.name} className="line-series" fill={color} stroke={color}>
                                        {runs.map((d) => <path key={d} d={d} fill="none"/>)}
                                        {s.points.map((p, i) => p.value === null ? null : (
                                            <circle key={model.periods[i]} cx={x(i)} cy={y(p.value)} r={3.5} stroke="none">
                                                <title>{`${s.name}, ${model.labels[i]}: ${p.text}`}</title>
                                            </circle>
                                        ))}
                                        {marked >= 0 && s.points[marked].value !== null && (
                                            <>
                                                <circle className="line-marked" cx={x(marked)} cy={y(s.points[marked].value ?? 0)} r={6} stroke="none"/>
                                                <text className="line-value" stroke="none" x={x(marked) + 9} y={y(s.points[marked].value ?? 0)} dominantBaseline="central">
                                                    {s.points[marked].text}
                                                </text>
                                            </>
                                        )}
                                        {model.series.length === 1 && marked < 0 && lastIndex >= 0 && (
                                            <text className="line-value" stroke="none" x={x(lastIndex)} y={y(s.points[lastIndex].value ?? 0) - 9} textAnchor="middle">
                                                {s.points[lastIndex].text}
                                            </text>
                                        )}
                                    </g>
                                );
                            })}
                        </svg>
                        {legend && model.series.length > 1 && (
                            <Legend title={model.seriesLabel || undefined} items={model.series.map((s) => ({ key: s.name, label: s.name, color: s.color }))}/>
                        )}
                    </div>
                );
            })()}
        </Figure>
    );
};
