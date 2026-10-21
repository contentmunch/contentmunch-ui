import type {Color, Dataset, Unit} from "../dataset/Dataset.ts";
import {assignColors} from "../dataset/colors.ts";
import {formatPeriod, keyOf, labelOf, numberOf, rowsForPeriod, shapeOf} from "../dataset/derive.ts";
import {formatValue} from "../dataset/units.ts";

/** At most this many slices are drawn; the rest of the categories are grouped into "Other". */
export const MAX_SLICES = 6;
export const OTHER = "Other";

export interface RadialSlice {
    key: string;
    value: number;
    /** Of the whole, 0 to 1. */
    share: number;
    color: Color;
    valueText: string;
    shareText: string;
}

export interface RadialModel {
    slices: RadialSlice[];
    total: number;
    totalText: string;
    /** What the number in the middle is: the period when the data has one, otherwise the measure's label. */
    centerLabel: string;
    measureLabel: string;
}

/** A `share` measure is a part of a whole; for printing a raw value it is just a number. */
export const rawUnit = (unit: Unit): Unit => (unit === "share" ? "number" : unit);

/** Pie and donut: one category, one measure (the first), one period, in the order the data gives. The smallest past six become Other. */
export const radialModel = (data: Dataset, period?: string | null, locale?: string): RadialModel => {
    const { categories, measures, time } = shapeOf(data);
    const category = categories[0];
    const measure = measures[0];
    const { rows, period: shown } = rowsForPeriod(data, period);

    const sums = new Map<string, number>();
    for (const row of rows) {
        const key = keyOf(row, category);
        sums.set(key, (sums.get(key) ?? 0) + numberOf(row, measure));
    }
    // colors come from every period's categories, so a category keeps its color as the period changes
    const colors = assignColors(data.rows.map((r) => keyOf(r, category)), category.colors);
    const unit = rawUnit(measure.unit);
    const total = [...sums.values()].reduce((a, b) => a + b, 0);

    // parts keep the order the data gives them (a part worth nothing stays, so it can still be listed and chosen); past six, the
    // smallest are grouped into Other at the end
    const all = [...sums.entries()];
    const largest = new Set([...all].sort((a, b) => b[1] - a[1]).slice(0, MAX_SLICES - 1).map(([k]) => k));
    const tooMany = all.length > MAX_SLICES;
    const kept = tooMany ? all.filter(([k]) => largest.has(k)) : all;
    const rest = tooMany ? all.filter(([k]) => !largest.has(k)) : [];
    const entries: [string, number, Color][] = kept.map(([k, v]) => [k, v, colors.get(k) ?? "neutral"]);
    if (rest.length > 0) entries.push([OTHER, rest.reduce((a, [, v]) => a + v, 0), "neutral"]);

    const shown_ = entries.reduce((a, [, v]) => a + v, 0);
    return {
        slices: entries.map(([key, value, color]) => ({
            key,
            value,
            share: shown_ > 0 ? value / shown_ : 0,
            color,
            valueText: formatValue(value, unit, locale),
            shareText: formatValue(shown_ > 0 ? value / shown_ : 0, "share", locale),
        })),
        total: shown_,
        totalText: formatValue(total, unit, locale),
        centerLabel: shown && time ? formatPeriod(shown, time.grain) : labelOf(measure),
        measureLabel: labelOf(measure),
    };
};
