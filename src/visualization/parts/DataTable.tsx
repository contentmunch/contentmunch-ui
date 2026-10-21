import * as React from "react";
import type {Dataset} from "../dataset/Dataset.ts";
import {formatPeriod, labelOf} from "../dataset/derive.ts";
import {formatValue} from "../dataset/units.ts";
import {rawUnit} from "../adapters/radial.ts";

/** Every figure is also its numbers: a table that is only visible to screen readers and to search. */
export const DataTable: React.FC<{ data: Dataset }> = ({ data }) => (
    <table className="muncher-viz-sr">
        <caption>{data.title}</caption>
        <thead>
        <tr>{data.columns.map((c) => <th key={c.name} scope="col">{labelOf(c)}</th>)}</tr>
        </thead>
        <tbody>
        {data.rows.map((row, i) => (
            <tr key={i}>
                {data.columns.map((c) => {
                    const cell = row[c.name];
                    if (cell === null || cell === undefined) return <td key={c.name}/>;
                    if (c.role === "measure" && typeof cell === "number") return <td key={c.name}>{formatValue(cell, rawUnit(c.unit))}</td>;
                    if (c.role === "time") return <td key={c.name}>{formatPeriod(String(cell), c.grain)}</td>;
                    return <td key={c.name}>{String(cell)}</td>;
                })}
            </tr>
        ))}
        </tbody>
    </table>
);
