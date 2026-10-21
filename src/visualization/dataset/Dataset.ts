/**
 * One typed dataset describes the numbers; every visualization is a different drawing of it. The dataset says what the numbers are
 * (units, colors, titles); a chart only decides how to draw them. See docs/visualization-design.md.
 */

export type Unit = "count" | "number" | "percent" | "share" | `currency:${string}`;

/**
 * A theme token, so dark mode needs no change in the data (`1` to `8` are the series palette), or a `#rrggbb` the person chose, which
 * is used as it is in both themes. Prefer a token unless the color is the user's to choose.
 */
export type Color = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "good" | "bad" | "warn" | "info" | "neutral" | `#${string}`;

export type Grain = "day" | "month" | "quarter" | "year";

export type Cell = string | number | null;
export type Row = Record<string, Cell>;

export interface CategoryColumn {
    name: string;
    /** What you slice by: a property, a status, a region. */
    role: "category";
    label?: string;
    /** Pin a value to a color, so "Occupied" is drawn the same way in every kind and period. */
    colors?: Record<string, Color>;
}

export interface MeasureColumn {
    name: string;
    /** A number to draw. */
    role: "measure";
    /** There is no unit-less number. */
    unit: Unit;
    label?: string;
    /** Pin this measure's color when it is drawn as a series. */
    color?: Color;
}

export interface TimeColumn {
    name: string;
    /** An ISO date (`2026-10-01`, or `2026-10` for a month); the grain says how it is printed and stepped. */
    role: "time";
    grain: Grain;
}

export type Column = CategoryColumn | MeasureColumn | TimeColumn;

export interface Dataset {
    /** States the point: "Online overtook retail in March". */
    title: string;
    /** Required plain-text description; read by screen readers and indexed for search. */
    summary: string;
    columns: Column[];
    rows: Row[];
}

export type VisualizationSize = "small" | "medium" | "large";

/** The contract every chart shares. Data is the only required prop. */
export interface VisualizationProps {
    data: Dataset;
    /** Default `medium`. */
    size?: VisualizationSize;
    /** A category value; controlled. Choosing the selected one again reports `null`. */
    selected?: string | null;
    onSelect?: (key: string | null) => void;
    /** An ISO date for kinds that show one period at a time; defaults to the latest. */
    period?: string | null;
    /** Whether the legend is shown. Default true; leave it out when the page already lists the same parts beside the chart. */
    legend?: boolean;
}
