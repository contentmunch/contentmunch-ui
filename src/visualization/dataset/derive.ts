import type {CategoryColumn, Column, Dataset, Grain, MeasureColumn, Row, TimeColumn} from "./Dataset.ts";

export interface Shape {
    categories: CategoryColumn[];
    measures: MeasureColumn[];
    time: TimeColumn | null;
}

export const shapeOf = (data: Dataset): Shape => ({
    categories: data.columns.filter((c): c is CategoryColumn => c.role === "category"),
    measures: data.columns.filter((c): c is MeasureColumn => c.role === "measure"),
    time: data.columns.find((c): c is TimeColumn => c.role === "time") ?? null,
});

export const labelOf = (column: Column): string => ("label" in column && column.label ? column.label : column.name);

/** The text of a category cell: a missing value is its own, visible category. */
export const keyOf = (row: Row, column: CategoryColumn): string => {
    const cell = row[column.name];
    return cell === null || cell === undefined || cell === "" ? "(none)" : String(cell);
};

export const numberOf = (row: Row, column: MeasureColumn): number => {
    const cell = row[column.name];
    return typeof cell === "number" && Number.isFinite(cell) ? cell : 0;
};

/** The distinct periods in the data, oldest first, each written one way whatever form the dates came in. */
export const periodsOf = (data: Dataset): string[] => {
    const { time } = shapeOf(data);
    if (!time) return [];
    return [...new Set(data.rows.map((r) => canonicalPeriod(r[time.name], time.grain)).filter((p): p is string => p !== null))].sort();
};

export const latestPeriod = (data: Dataset): string | null => periodsOf(data).at(-1) ?? null;

/** The rows of one period; all of them when the dataset has no time column. A period that is not in the data falls back to the latest. */
export const rowsForPeriod = (data: Dataset, period?: string | null): { rows: Row[]; period: string | null } => {
    const { time } = shapeOf(data);
    if (!time) return { rows: data.rows, period: null };
    const periods = periodsOf(data);
    const asked = period ? canonicalPeriod(period, time.grain) : null;
    const chosen = asked !== null && periods.includes(asked) ? asked : (periods.at(-1) ?? null);
    return { rows: data.rows.filter((r) => canonicalPeriod(r[time.name], time.grain) === chosen), period: chosen };
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** A period as a person reads it: `October 2026`, `Q4 2026`, `2026`, `Oct 21, 2026`. */
export const formatPeriod = (iso: string, grain: Grain): string => {
    const [y, m = "1", d = "1"] = iso.split("-");
    const month = Math.min(12, Math.max(1, Number(m)));
    switch (grain) {
        case "year":
            return y;
        case "quarter":
            return `Q${Math.floor((month - 1) / 3) + 1} ${y}`;
        case "month":
            return `${MONTHS[month - 1]} ${y}`;
        default:
            return `${MONTHS[month - 1].slice(0, 3)} ${Number(d)}, ${y}`;
    }
};

const DATE = /^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/;
const pad = (n: number): string => String(n).padStart(2, "0");

/** A time value as the period it falls in, written one way (`2026-10-21`, `2026-10`, `2026`); null when it is not a date. */
export const canonicalPeriod = (value: unknown, grain: Grain): string | null => {
    if (typeof value !== "string") return null;
    const m = DATE.exec(value.trim());
    if (!m) return null;
    const y = Number(m[1]);
    const mo = Number(m[2] ?? "1");
    const d = Number(m[3] ?? "1");
    if (mo < 1 || mo > 12 || d < 1 || d > new Date(Date.UTC(y, mo, 0)).getUTCDate()) return null;
    switch (grain) {
        case "year":
            return String(y);
        case "quarter":
            return `${y}-${pad(Math.floor((mo - 1) / 3) * 3 + 1)}`;
        case "month":
            return `${y}-${pad(mo)}`;
        default:
            return `${y}-${pad(mo)}-${pad(d)}`;
    }
};

/** The period right after (or, with a negative step, before) a canonical one. */
export const shiftPeriod = (period: string, grain: Grain, steps: number): string => {
    const [y, mo = "1", d = "1"] = period.split("-").map(Number).map(String);
    const date = new Date(Date.UTC(Number(y), Number(mo) - 1, Number(d)));
    switch (grain) {
        case "year":
            date.setUTCFullYear(date.getUTCFullYear() + steps);
            break;
        case "quarter":
            date.setUTCMonth(date.getUTCMonth() + 3 * steps);
            break;
        case "month":
            date.setUTCMonth(date.getUTCMonth() + steps);
            break;
        default:
            date.setUTCDate(date.getUTCDate() + steps);
    }
    return canonicalPeriod(date.toISOString().slice(0, 10), grain) ?? period;
};

/** Every period from the first to the last, none skipped, so a gap in the data shows as a gap. Stops past `limit`. */
export const periodRange = (first: string, last: string, grain: Grain, limit = 1000): string[] => {
    const range: string[] = [];
    for (let p = first; p <= last && range.length <= limit; p = shiftPeriod(p, grain, 1)) range.push(p);
    return range;
};
