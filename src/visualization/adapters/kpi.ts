import type {Color, Dataset} from "../dataset/Dataset.ts";
import {canonicalPeriod, formatPeriod, labelOf, numberOf, periodRange, shapeOf, shiftPeriod} from "../dataset/derive.ts";
import {formatValue} from "../dataset/units.ts";
import {rawUnit} from "./radial.ts";

export interface KpiModel {
    label: string;
    valueText: string;
    periodText: string;
    /** The change from the period before; absent when there is only one period. */
    change: null | { direction: "up" | "down" | "flat"; deltaText: string; percentText: string | null; againstText: string };
    /** Every period's value up to the one shown, oldest first, for the small line. */
    history: number[];
    color: Color;
}

/**
 * The latest number and which way it is heading: one measure over time, the period shown being the latest unless one is given, and the
 * change measured from the period right before it by the calendar.
 */
export const kpiModel = (data: Dataset, period?: string | null, locale?: string): KpiModel => {
    const { measures, time } = shapeOf(data);
    const measure = measures[0];
    const unit = rawUnit(measure.unit);
    const grain = time?.grain ?? "month";
    const totals = new Map<string, number>();
    for (const row of data.rows) {
        const p = canonicalPeriod(row[time?.name ?? ""], grain);
        if (p !== null) totals.set(p, (totals.get(p) ?? 0) + numberOf(row, measure));
    }
    const present = [...totals.keys()].sort();
    const asked = period ? canonicalPeriod(period, grain) : null;
    const shown = asked !== null && totals.has(asked) ? asked : (present.at(-1) ?? null);
    const value = shown === null ? 0 : (totals.get(shown) ?? 0);
    // the history is every period up to the one shown that has a value
    const history = shown === null ? [] : periodRange(present[0], shown, grain).filter((p) => totals.has(p)).map((p) => totals.get(p) ?? 0);
    // the change is from the period right before, by the calendar; if that has no value there is nothing to compare
    const before = shown === null ? null : shiftPeriod(shown, grain, -1);
    let change: KpiModel["change"] = null;
    if (shown !== null && before !== null && totals.has(before)) {
        const previous = totals.get(before) ?? 0;
        const delta = value - previous;
        change = {
            direction: delta > 0 ? "up" : delta < 0 ? "down" : "flat",
            deltaText: `${delta > 0 ? "+" : delta < 0 ? "-" : ""}${formatValue(Math.abs(delta), unit, locale)}`,
            percentText: previous !== 0 ? `${delta > 0 ? "+" : delta < 0 ? "-" : ""}${formatValue(Math.abs(delta / previous), "percent", locale)}` : null,
            againstText: formatPeriod(before, grain),
        };
    }
    return {
        label: labelOf(measure),
        valueText: formatValue(value, unit, locale),
        periodText: shown ? formatPeriod(shown, grain) : "",
        change,
        history,
        color: measure.color ?? "1",
    };
};
