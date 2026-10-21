import type {Dataset} from "../dataset/Dataset.ts";
import {formatPeriod, labelOf} from "../dataset/derive.ts";
import {formatValue} from "../dataset/units.ts";
import {rawUnit} from "./radial.ts";

export interface TableCell {
    text: string;
    /** What sorts the cell: the number itself for a measure, the text otherwise. */
    sort: string | number;
}

export interface TableModel {
    headers: { name: string; numeric: boolean }[];
    rows: TableCell[][];
}

/** The exact figures, every column and row in the order given, each printed by its unit. */
export const tableModel = (data: Dataset, locale?: string): TableModel => ({
    headers: data.columns.map((c) => ({ name: labelOf(c), numeric: c.role === "measure" })),
    rows: data.rows.map((row) =>
        data.columns.map((c): TableCell => {
            const cell = row[c.name];
            if (cell === null || cell === undefined) return { text: "", sort: "" };
            if (c.role === "measure" && typeof cell === "number") return { text: formatValue(cell, rawUnit(c.unit), locale), sort: cell };
            if (c.role === "time") return { text: formatPeriod(String(cell), c.grain), sort: String(cell) };
            return { text: String(cell), sort: String(cell) };
        }),
    ),
});
