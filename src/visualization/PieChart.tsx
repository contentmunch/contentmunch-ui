import * as React from "react";
import type {VisualizationProps} from "./dataset/Dataset.ts";
import {colorHex} from "./dataset/colors.ts";
import {labelOf, shapeOf} from "./dataset/derive.ts";
import {validateFor} from "./dataset/validate.ts";
import {radialModel} from "./adapters/radial.ts";
import {Figure} from "./parts/Figure.tsx";
import {PiePlot} from "./plots/PiePlot.tsx";

/** What share is each part? One category and one measure, the parts in the order the data gives, the smallest past six as Other. */
export const PieChart: React.FC<VisualizationProps> = ({ data, size = "medium", selected, onSelect, period, legend = true }) => {
    const problems = validateFor("pie", data);
    const model = problems.length === 0 ? radialModel(data, period) : null;
    return (
        <Figure data={data} size={size} kind="pie" problems={problems} empty={model !== null && model.total <= 0}>
            {model && (
                <PiePlot
                    data={model.slices.map((s) => ({
                        title: s.key,
                        value: s.value,
                        legend: `${s.key} (${s.valueText}: ${s.shareText})`,
                        isSelected: selected === s.key,
                    }))}
                    withLegend={legend}
                    legendTitle={labelOf(shapeOf(data).categories[0])}
                    colorRange={model.slices.map((s) => colorHex(s.color))}
                    valueFormatter={(n, i) => model.slices[i]?.valueText ?? String(n)}
                    onClick={onSelect ? (index) => {
                        const key = model.slices[index]?.key;
                        if (key !== undefined) onSelect(selected === key ? null : key);
                    } : undefined}
                />
            )}
        </Figure>
    );
};
