import * as React from "react";
import type {VisualizationProps} from "./dataset/Dataset.ts";
import type {Kind} from "./dataset/validate.ts";
import {BarChart} from "./BarChart.tsx";
import {DonutChart} from "./DonutChart.tsx";
import {KpiChart} from "./KpiChart.tsx";
import {LineChart} from "./LineChart.tsx";
import {PieChart} from "./PieChart.tsx";
import {TableChart} from "./TableChart.tsx";

/** Draws a dataset as the kind asked for; the kind is data on whatever stores the visualization, so changing it never touches the data. */
export const Visualization: React.FC<VisualizationProps & { kind: Kind }> = ({ kind, ...props }) => {
    switch (kind) {
        case "pie":
            return <PieChart {...props}/>;
        case "donut":
            return <DonutChart {...props}/>;
        case "line":
            return <LineChart {...props}/>;
        case "kpi":
            return <KpiChart {...props}/>;
        case "table":
            return <TableChart {...props}/>;
        default:
            return <BarChart {...props}/>;
    }
};
