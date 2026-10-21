import {describe, expect, it} from "vitest";
import {formatValue, isUnit} from "./units.ts";

describe("formatValue", () => {
    it("prints a count as a whole number with grouping", () => {
        expect(formatValue(1240.4, "count", "en-US")).toBe("1,240");
    });

    it("chooses decimals for a number from its size", () => {
        expect(formatValue(3.14159, "number", "en-US")).toBe("3.14");
        expect(formatValue(42.54, "number", "en-US")).toBe("42.5");
        expect(formatValue(12345.6, "number", "en-US")).toBe("12,346");
    });

    it("prints a fraction as a percent for percent and share", () => {
        expect(formatValue(0.42, "percent", "en-US")).toBe("42%");
        expect(formatValue(0.042, "share", "en-US")).toBe("4.2%");
    });

    it("prints currency with cents, always, so amounts line up", () => {
        expect(formatValue(1850, "currency:USD", "en-US")).toBe("$1,850.00");
        expect(formatValue(612.4, "currency:USD", "en-US")).toBe("$612.40");
    });
});

describe("isUnit", () => {
    it("accepts the known units and a three-letter currency", () => {
        for (const u of ["count", "number", "percent", "share", "currency:USD", "currency:cad"]) expect(isUnit(u)).toBe(true);
    });

    it("refuses anything else", () => {
        for (const u of ["", "dollars", "currency:", "currency:DOLLARS", 4, null]) expect(isUnit(u)).toBe(false);
    });
});
