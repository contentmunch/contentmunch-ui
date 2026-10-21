import type {Dataset} from "./Dataset.ts";
import {canonicalPeriod, keyOf, periodRange, shapeOf} from "./derive.ts";
import {isColor} from "./colors.ts";
import {isUnit} from "./units.ts";

export type Kind = "pie" | "donut" | "bar" | "line" | "kpi" | "table";

/** A line draws at most this many periods, gaps included. */
export const MAX_PERIODS = 1000;

/** A line draws at most this many series. */
export const MAX_SERIES = 6;

export const MAX_ROWS = 500;
const MAX_TEXT = 200;

/** Why a dataset cannot be drawn, in words a person can act on. */
export type Problem = string;

const finite = (cell: unknown): boolean => cell === null || cell === undefined || (typeof cell === "number" && Number.isFinite(cell));

/** What is wrong with the dataset itself, whatever draws it. */
export const validateDataset = (data: Dataset): Problem[] => {
    const problems: Problem[] = [];
    if (!data.title?.trim()) problems.push("The data needs a title.");
    if (!data.summary?.trim()) problems.push("The data needs a summary describing what it shows.");
    if ((data.title?.length ?? 0) > MAX_TEXT || (data.summary?.length ?? 0) > MAX_TEXT * 5) problems.push("The title or summary is too long.");
    const { categories, measures, time } = shapeOf(data);
    if (measures.length === 0) problems.push("The data needs at least one measure.");
    if (categories.length > 2) problems.push("The data can split by at most two categories.");
    if (data.columns.filter((c) => c.role === "time").length > 1) problems.push("The data can have only one time column.");
    const names = data.columns.map((c) => c.name);
    if (new Set(names).size !== names.length) problems.push("Two columns have the same name.");
    for (const m of measures) if (!isUnit(m.unit)) problems.push(`The unit of "${m.name}" is not one of count, number, percent, share or currency:XXX.`);
    if (time && data.rows.some((r) => canonicalPeriod(r[time.name], time.grain) === null)) {
        problems.push(`"${time.name}" has a value that is not a date (use 2026-10-21, 2026-10 or 2026).`);
    }
    for (const c of data.columns) {
        const pinned = c.role === "category" ? Object.values(c.colors ?? {}) : c.role === "measure" && c.color ? [c.color] : [];
        if (pinned.some((color) => !isColor(color))) problems.push(`A color on "${c.name}" is not a theme color or a #rrggbb value.`);
    }
    if (data.rows.length > MAX_ROWS) problems.push(`The data has more than ${MAX_ROWS} rows.`);
    for (const row of data.rows) {
        for (const m of measures) {
            if (!finite(row[m.name])) problems.push(`"${m.name}" has a value that is not a finite number.`);
        }
    }
    if (categories.length > 0) {
        const seen = new Set<string>();
        for (const row of data.rows) {
            const key = [...categories.map((c) => keyOf(row, c)), time ? String(row[time.name] ?? "") : ""].join("\u0000");
            if (seen.has(key)) {
                problems.push("Two rows have the same category and period.");
                break;
            }
            seen.add(key);
        }
    }
    return [...new Set(problems)];
};

/** What the data must also satisfy for one kind to draw it. */
export const validateFor = (kind: Kind, data: Dataset): Problem[] => {
    const problems = validateDataset(data);
    const { categories, measures, time } = shapeOf(data);
    if (problems.length > 0) return problems;
    if (kind === "pie" || kind === "donut") {
        if (categories.length !== 1) problems.push(categories.length < 1 ? "A pie or donut needs a category to slice by." : "A pie or donut slices by one category.");
        const first = measures[0];
        if (first && data.rows.some((r) => typeof r[first.name] === "number" && (r[first.name] as number) < 0))
            problems.push("A pie or donut cannot show negative values. Use a bar chart instead.");
    }
    if (kind === "bar") {
        if (categories.length < 1) problems.push("A bar chart needs a category to compare.");
        if (data.rows.some((r) => measures.some((m) => typeof r[m.name] === "number" && (r[m.name] as number) < 0)))
            problems.push("Bars cannot show negative values yet.");
        const second = categories[1];
        if (second && new Set(data.rows.map((r) => keyOf(r, second))).size > 2) problems.push("A bar chart compares two groups at most.");
        const shares = measures.filter((m) => m.unit === "share").length;
        if (shares > 0 && shares < measures.length) problems.push("Either every measure is a share or none is.");
    }
    if (kind === "line" || kind === "kpi") {
        if (!time) problems.push(kind === "line" ? "A line needs a time column." : "A KPI needs a time column.");
        else if (data.rows.length === 0) problems.push("There are no periods to show.");
    }
    if (kind === "line" && time) {
        if (categories.length > 1) problems.push("A line can split by one category at most.");
        if (categories.length === 1 && measures.length > 1) problems.push("A line splits by a category or draws several measures, not both.");
        const days = data.rows.map((r) => canonicalPeriod(r[time.name], time.grain)).filter((v): v is string => v !== null).sort();
        if (days.length > 0 && periodRange(days[0], days.at(-1) ?? days[0], time.grain).length > MAX_PERIODS) {
            problems.push(`The time range has more than ${MAX_PERIODS} ${time.grain}s; use a coarser grain.`);
        }
        const series = categories.length === 1 ? new Set(data.rows.map((r) => keyOf(r, categories[0]))).size : measures.length;
        if (series > MAX_SERIES) problems.push(`A line draws at most ${MAX_SERIES} series.`);
    }
    return problems;
};
