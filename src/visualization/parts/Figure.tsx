import * as React from "react";
import {useId} from "react";
import type {CSSProperties} from "react";
import type {Dataset, VisualizationSize} from "../dataset/Dataset.ts";
import {barWidthOf, diameterOf, FACTOR} from "./sizes.ts";
import {DataTable} from "./DataTable.tsx";
import "../assets/visualization.css";

interface Props {
    data: Dataset;
    size: VisualizationSize;
    kind: "pie" | "donut" | "bar" | "line" | "kpi" | "table";
    /** Why the data cannot be drawn; shown in place of the chart. */
    problems?: string[];
    /** The data is valid but there is nothing to draw. */
    empty?: boolean;
    /** The kind already shows every number (a table), so the hidden copy is left out. */
    hideTable?: boolean;
    children?: React.ReactNode;
}

/**
 * What every kind shares around its drawing: one size rule, the title and summary for assistive technology, the numbers as a hidden
 * table, and the states for data that cannot be drawn. The drawing itself is what the charts have always drawn.
 */
export const Figure: React.FC<Props> = ({ data, size, kind, problems = [], empty = false, hideTable = false, children }) => {
    const id = useId();
    const style = { "--viz-diameter": `${diameterOf(size)}px`, "--viz-width": `${barWidthOf(size)}px`, "--viz-factor": FACTOR[size] } as CSSProperties;
    return (
        <figure className={`muncher-viz muncher-viz--${kind}`} style={style} aria-labelledby={`${id}-t`} aria-describedby={`${id}-d`}>
            <figcaption className="muncher-viz-sr" id={`${id}-t`}>{data.title}</figcaption>
            {problems.length > 0 ? (
                <p className="muncher-viz-state" role="alert">This chart can&rsquo;t be drawn. {problems[0]}</p>
            ) : empty ? (
                <p className="muncher-viz-state" role="status">No data to show.</p>
            ) : children}
            <p className="muncher-viz-sr" id={`${id}-d`}>{data.summary}</p>
            {problems.length === 0 && !hideTable && <DataTable data={data}/>}
        </figure>
    );
};
