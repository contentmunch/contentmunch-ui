import type {Unit} from "./Dataset.ts";

const KNOWN = ["count", "number", "percent", "share"];

export const isUnit = (unit: unknown): unit is Unit =>
    typeof unit === "string" && (KNOWN.includes(unit) || /^currency:[A-Za-z]{3}$/.test(unit));

const formatters = new Map<string, Intl.NumberFormat>();
const formatter = (locale: string | undefined, options: Intl.NumberFormatOptions): Intl.NumberFormat => {
    const key = `${locale ?? ""}|${JSON.stringify(options)}`;
    let found = formatters.get(key);
    if (!found) {
        found = new Intl.NumberFormat(locale, options);
        formatters.set(key, found);
    }
    return found;
};

/** An axis tick: the same as a value, except a currency drops its cents (a tick is a round number). */
export const formatTick = (value: number, unit: Unit, locale?: string): string =>
    unit.startsWith("currency:")
        ? formatter(locale, { style: "currency", currency: unit.slice("currency:".length).toUpperCase(), maximumFractionDigits: 0 }).format(value)
        : formatValue(value, unit, locale);

/**
 * A value printed by its unit, so no chart needs a formatter of its own. A `percent` or `share` value is a fraction (`0.42` is `42%`).
 */
export const formatValue = (value: number, unit: Unit, locale?: string): string => {
    switch (unit) {
        case "count":
            return formatter(locale, { maximumFractionDigits: 0 }).format(value);
        case "number": {
            const abs = Math.abs(value);
            const digits = abs >= 1000 ? 0 : abs >= 10 ? 1 : 2;
            return formatter(locale, { maximumFractionDigits: digits }).format(value);
        }
        case "percent":
        case "share":
            return formatter(locale, { style: "percent", maximumFractionDigits: Math.abs(value) < 0.1 ? 1 : 0 }).format(value);
        default: {
            const currency = unit.slice("currency:".length).toUpperCase();
            return formatter(locale, { style: "currency", currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
        }
    }
};
