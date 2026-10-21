import * as React from "react";
import type {VisualizationProps} from "./dataset/Dataset.ts";
import {validateFor} from "./dataset/validate.ts";
import {barPlotInput} from "./adapters/barPlot.ts";
import {Figure} from "./parts/Figure.tsx";
import {BarPlot} from "./plots/BarPlot.tsx";

/** Bars take no selection: the drawing has never had one. */
export type BarChartProps = Pick<VisualizationProps, "data" | "size" | "period" | "legend">;

/**
 * How do these compare? The measures stack in each bar; a second category, or two periods, puts one bar per group beside each other;
 * measures that are shares scale every bar to 100%.
 */
export const BarChart: React.FC<BarChartProps> = ({ data, size = "medium", period, legend = true }) => {
    const problems = validateFor("bar", data);
    const input = problems.length === 0 ? barPlotInput(data, period) : null;
    return (
        <Figure data={data} size={size} kind="bar" problems={problems} empty={input !== null && input.data.values.length === 0}>
            {input && (
                <BarPlot
                    data={input.data}
                    comparisonData={input.comparisonData}
                    toPercentage={input.toPercentage}
                    colorRange={input.colorRange}
                    withLegend={legend}
                    axisMax={input.axisMax}
                />
            )}
        </Figure>
    );
};
