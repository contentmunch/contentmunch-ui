import * as React from "react";
import type {VisualizationProps} from "./dataset/Dataset.ts";
import {validateFor} from "./dataset/validate.ts";
import {tableModel} from "./adapters/table.ts";
import {Figure} from "./parts/Figure.tsx";
import {Table, type Col, type Head} from "../table/Table.tsx";

/** A table takes no selection or period: it lists every row. */
export type TableChartProps = Pick<VisualizationProps, "data" | "size">;

/** What are the exact values? The library's own table, with the data's columns in the order given and numbers that sort as numbers. */
export const TableChart: React.FC<TableChartProps> = ({ data, size = "medium" }) => {
    const problems = validateFor("table", data);
    const model = problems.length === 0 ? tableModel(data) : null;
    return (
        <Figure data={data} size={size} kind="table" problems={problems} empty={model !== null && model.rows.length === 0} hideTable>
            {model && (
                <Table excludeDownload excludePagination={model.rows.length <= 50} fileName={data.title}>
                    {/* the table sorts by cell text; a number sorts by its own value, found through the row index kept in the first cell's csv */}
                    {{
                        header: model.headers.map((h, column): Head => ({
                            name: h.name,
                            ...(h.numeric ? { sort: (a: Col[], b: Col[]) => Number(model.rows[Number(a[0].csv)][column].sort) - Number(model.rows[Number(b[0].csv)][column].sort) } : {}),
                        })),
                        rows: model.rows.map((cells, r): Col[] => cells.map((cell, c) => ({ value: cell.text, content: cell.text, csv: c === 0 ? String(r) : cell.text }))),
                    }}
                </Table>
            )}
        </Figure>
    );
};
