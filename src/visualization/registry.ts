import type {Dataset} from "./dataset/Dataset.ts";
import {shapeOf} from "./dataset/derive.ts";
import {validateFor, type Kind} from "./dataset/validate.ts";

export const KINDS: readonly Kind[] = ["bar", "pie", "donut", "line", "kpi", "table"];

export const KIND_LABELS: Record<Kind, string> = {
    bar: "Bar", pie: "Pie", donut: "Donut", line: "Line", kpi: "KPI", table: "Table",
};

/** The kinds worth trying first for this shape of data, best first. */
const preferred = (data: Dataset): Kind[] => {
    const { categories, measures, time } = shapeOf(data);
    if (time && categories.length === 0) return measures.length === 1 ? ["line", "kpi", "bar", "table"] : ["line", "bar", "table"];
    if (time) return ["line", "bar", "table"];
    if (categories.length === 1 && measures.length === 1) return ["bar", "donut", "pie", "table"];
    return ["bar", "table"];
};

/** The kinds that can draw this dataset, in order of preference: what an editor offers in its "type" dropdown. */
export const fitting = (data: Dataset): Kind[] => {
    const wanted = preferred(data);
    const order = [...wanted, ...KINDS.filter((k) => !wanted.includes(k))];
    return order.filter((kind) => validateFor(kind, data).length === 0);
};
