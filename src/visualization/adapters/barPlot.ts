import type {Color, Dataset, Row} from "../dataset/Dataset.ts";
import {assignColors, colorHex} from "../dataset/colors.ts";
import {canonicalPeriod, formatPeriod, keyOf, labelOf, numberOf, periodsOf, rowsForPeriod, shapeOf} from "../dataset/derive.ts";
import type {FieldValue, StackedBarChartData} from "../plots/data/StackedBarChartData.ts";

const TITLE = "Title";
const TOTAL = "Total";
const SEPARATOR = ":";

/** What the bar drawing takes. */
export interface BarPlotInput {
    data: StackedBarChartData;
    /** The second group, when the bars compare two. */
    comparisonData?: StackedBarChartData;
    toPercentage: boolean;
    colorRange: string[];
    /** The name of each series, in stacking order, with its color. */
    series: { name: string; color: Color }[];
    /** What the two groups are called, in order; empty when there is no comparison. */
    groups: string[];
    categoryLabel: string;
    /** When one period of several is shown: the largest bar in any period, so the axis stays still while the period changes. */
    axisMax?: number;
}

/**
 * The first category on one axis, the measures stacked in each bar; a second category (or two periods) puts one bar per group
 * beside each other. If the measures are shares each bar is scaled to 100%.
 */
export const barPlotInput = (data: Dataset, period?: string | null): BarPlotInput => {
    const { categories, measures, time } = shapeOf(data);
    const category = categories[0];
    const groupColumn = categories[1] ?? null;
    const periods = periodsOf(data);
    // two periods are compared, unless one is asked for; more than that, one is shown at a time
    const compareTime = !groupColumn && time !== null && periods.length === 2 && !period;
    const singlePeriod = !groupColumn && time !== null && !compareTime;
    const rows: Row[] = groupColumn || compareTime || !time ? data.rows : rowsForPeriod(data, period).rows;

    const groupOf = (row: Row): string => groupColumn ? keyOf(row, groupColumn) : compareTime && time ? (canonicalPeriod(row[time.name], time.grain) ?? "") : "";
    const groupKeys = [...new Set(rows.map(groupOf))].sort((a, b) => (compareTime ? a.localeCompare(b) : 0));
    const groups = groupKeys.length > 1 ? groupKeys.slice(0, 2) : [];
    const printed = (g: string) => (compareTime && time ? formatPeriod(g, time.grain) : g);

    const pinned: Record<string, Color> = {};
    for (const m of measures) if (m.color) pinned[m.name] = m.color;
    const colors = assignColors(measures.map((m) => m.name), pinned);
    const series = measures.map((m) => ({ name: m.name, color: colors.get(m.name) ?? ("neutral" as Color) }));

    const zeroRow = (key: string): FieldValue => ({ [TITLE]: key, [TOTAL]: 0, ...Object.fromEntries(measures.map((m) => [m.name, 0])) });
    // stepping through periods: every category has its bar in every period (empty when it has no value), and the axis does not move
    const everyCategory = singlePeriod ? [...new Set(data.rows.map((r) => keyOf(r, category)))] : [];
    const axisMax = singlePeriod
        ? Math.max(0, ...periods.map((p) => {
            const sums = new Map<string, number>();
            for (const row of rowsForPeriod(data, p).rows) {
                sums.set(keyOf(row, category), (sums.get(keyOf(row, category)) ?? 0) + measures.reduce((a, m) => a + numberOf(row, m), 0));
            }
            return Math.max(0, ...sums.values());
        }))
        : undefined;

    const build = (group: string | null): StackedBarChartData => {
        const byCategory = new Map<string, FieldValue>();
        for (const key of everyCategory) byCategory.set(key, zeroRow(key));
        for (const row of rows) {
            if (group !== null && groupOf(row) !== group) continue;
            const key = keyOf(row, category);
            const title = group === null ? key : `${key}${SEPARATOR}${printed(group)}`;
            let value = byCategory.get(key);
            if (!value) {
                value = { [TITLE]: title, [TOTAL]: 0, ...Object.fromEntries(measures.map((m) => [m.name, 0])) };
                byCategory.set(key, value);
            }
            for (const m of measures) {
                const n = numberOf(row, m);
                value[m.name] = Number(value[m.name]) + n;
                value[TOTAL] = Number(value[TOTAL]) + n;
            }
        }
        return {
            titleField: TITLE,
            totalField: TOTAL,
            stackFields: measures.map((m) => m.name),
            values: [...byCategory.values()],
            ...(group !== null ? { titleSeparator: SEPARATOR } : {}),
        };
    };

    const first = groups.length === 2 ? build(groups[0]) : build(null);
    return {
        data: first,
        comparisonData: groups.length === 2 ? build(groups[1]) : undefined,
        toPercentage: measures.every((m) => m.unit === "share"),
        colorRange: series.map((s) => colorHex(s.color)),
        series,
        groups: groups.map(printed),
        categoryLabel: labelOf(category),
        axisMax: measures.every((m) => m.unit === "share") ? undefined : axisMax,
    };
};
