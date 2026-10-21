import type {Color, Dataset, Unit} from "../dataset/Dataset.ts";
import {assignColors} from "../dataset/colors.ts";
import {canonicalPeriod, formatPeriod, keyOf, labelOf, periodRange, shapeOf} from "../dataset/derive.ts";
import {formatTick, formatValue} from "../dataset/units.ts";
import {niceTicks} from "../parts/ticks.ts";
import {rawUnit} from "./radial.ts";

export interface LinePoint {
    value: number | null;
    text: string;
}

export interface LineSeries {
    name: string;
    color: Color;
    points: LinePoint[];
}

export interface LineModel {
    /** ISO periods, oldest first, and how each is printed. */
    periods: string[];
    labels: string[];
    series: LineSeries[];
    ticks: number[];
    tickTexts: string[];
    max: number;
    /** What the series are called when they are the category ("Region"); empty when they are the measures. */
    seriesLabel: string;
    unit: Unit;
}

/**
 * A line over time: one series per measure, or one per value of the category when there is a single measure. The axis runs through every
 * period between the first and the last at the data's grain; a period with no value breaks the line.
 */
export const lineModel = (data: Dataset, locale?: string): LineModel => {
    const { categories, measures, time } = shapeOf(data);
    const grain = time?.grain ?? "month";
    const present = data.rows.map((r) => canonicalPeriod(r[time?.name ?? ""], grain)).filter((p): p is string => p !== null).sort();
    // every period from the first to the last, so a month with no data is a gap in the line and not skipped
    const periods = present.length > 0 ? periodRange(present[0], present.at(-1) ?? present[0], grain) : [];
    const bySeries = new Map<string, Map<string, number>>();
    const add = (name: string, period: string, value: number) => {
        const m = bySeries.get(name) ?? new Map<string, number>();
        m.set(period, (m.get(period) ?? 0) + value);
        bySeries.set(name, m);
    };
    const category = categories[0];
    for (const row of data.rows) {
        const period = canonicalPeriod(row[time?.name ?? ""], grain);
        if (period === null) continue;
        if (category) {
            const v = row[measures[0].name];
            if (typeof v === "number") add(keyOf(row, category), period, v);
        } else {
            for (const m of measures) {
                const v = row[m.name];
                if (typeof v === "number") add(m.name, period, v);
            }
        }
    }
    const names = category ? [...bySeries.keys()] : measures.map((m) => m.name);
    const pinned: Record<string, Color> = {};
    if (category) Object.assign(pinned, category.colors ?? {});
    else for (const m of measures) if (m.color) pinned[m.name] = m.color;
    const colors = assignColors(names, pinned);
    const unit = rawUnit(measures[0].unit);
    const unitOf = (name: string): Unit => rawUnit(measures.find((m) => m.name === name)?.unit ?? measures[0].unit);

    const series: LineSeries[] = names.map((name) => ({
        name,
        color: colors.get(name) ?? "neutral",
        points: periods.map((p) => {
            const value = bySeries.get(name)?.get(p);
            return value === undefined
                ? { value: null, text: "" }
                : { value, text: formatValue(value, category ? unit : unitOf(name), locale) };
        }),
    }));
    const max = Math.max(0, ...series.flatMap((s) => s.points.map((p) => p.value ?? 0)));
    const ticks = niceTicks(max, 4);
    const top = ticks.at(-1) ?? max;
    return {
        periods,
        labels: periods.map((p) => formatPeriod(p, grain)),
        series,
        ticks,
        tickTexts: ticks.map((t) => formatTick(t, unit, locale)),
        max: Math.max(top, max),
        seriesLabel: category ? labelOf(category) : "",
        unit,
    };
};
