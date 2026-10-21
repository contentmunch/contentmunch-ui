import * as React from "react";
import type {VisualizationProps} from "./dataset/Dataset.ts";
import {colorHex} from "./dataset/colors.ts";
import {labelOf, shapeOf} from "./dataset/derive.ts";
import {validateFor} from "./dataset/validate.ts";
import {radialModel} from "./adapters/radial.ts";
import {Figure} from "./parts/Figure.tsx";
import {diameterOf} from "./parts/sizes.ts";
import {DonutPlot} from "./plots/DonutPlot.tsx";

/** A pie with the total, or the selected part, in the middle. */
export const DonutChart: React.FC<VisualizationProps> = ({ data, size = "medium", selected, onSelect, period, legend = true }) => {
    const problems = validateFor("donut", data);
    const model = problems.length === 0 ? radialModel(data, period) : null;
    const chosen = model?.slices.find((s) => s.key === selected) ?? null;
    return (
        <Figure data={data} size={size} kind="donut" problems={problems} empty={model !== null && model.total <= 0}>
            {model && (
                <DonutPlot
                    data={model.slices.map((s) => ({
                        title: s.key,
                        value: s.value,
                        color: colorHex(s.color),
                        legend: `${s.key} (${s.valueText}: ${s.shareText})`,
                    }))}
                    selected={selected}
                    onSelect={onSelect ? (title) => onSelect(selected === title ? null : title) : undefined}
                    centerLabel={chosen ? chosen.key : model.centerLabel}
                    centerValue={chosen ? chosen.valueText : model.totalText}
                    size={diameterOf(size)}
                    withLegend={legend}
                    legendTitle={labelOf(shapeOf(data).categories[0])}
                />
            )}
        </Figure>
    );
};
