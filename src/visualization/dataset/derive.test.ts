import {describe, expect, it} from "vitest";
import {canonicalPeriod, formatPeriod, latestPeriod, periodRange, periodsOf, rowsForPeriod, shapeOf, shiftPeriod} from "./derive.ts";
import {leaseTypes, spending} from "../fixtures.ts";

describe("shapeOf", () => {
    it("splits the columns by role", () => {
        const shape = shapeOf(spending);
        expect(shape.categories.map((c) => c.name)).toEqual(["category"]);
        expect(shape.measures.map((c) => c.name)).toEqual(["spent"]);
        expect(shape.time?.name).toBe("month");
    });
});

describe("periods", () => {
    it("lists the periods oldest first and defaults to the latest", () => {
        expect(periodsOf(spending)).toEqual(["2026-09", "2026-10"]);
        expect(latestPeriod(spending)).toBe("2026-10");
        expect(rowsForPeriod(spending).rows).toHaveLength(9);
    });

    it("shows the period asked for, and falls back to the latest for one that is not there", () => {
        expect(rowsForPeriod(spending, "2026-09")).toMatchObject({ period: "2026-09" });
        expect(rowsForPeriod(spending, "2026-09").rows).toHaveLength(2);
        expect(rowsForPeriod(spending, "1999-01").period).toBe("2026-10");
    });

    it("keeps every row when the data has no time column", () => {
        expect(rowsForPeriod(leaseTypes)).toEqual({ rows: leaseTypes.rows, period: null });
    });
});

describe("calendar periods", () => {
    it("writes a date as its period, whatever form it came in", () => {
        expect(canonicalPeriod("2026-10-21", "month")).toBe("2026-10");
        expect(canonicalPeriod("2026-10", "day")).toBe("2026-10-01");
        expect(canonicalPeriod("2026-11-30", "quarter")).toBe("2026-10");
        expect(canonicalPeriod("2026-02-14", "year")).toBe("2026");
    });

    it("refuses what is not a date", () => {
        for (const v of ["October", "2026-13", "2026-02-30", "", null, 4]) expect(canonicalPeriod(v, "month")).toBeNull();
    });

    it("steps by the grain, across month and year ends", () => {
        expect(shiftPeriod("2026-12", "month", 1)).toBe("2027-01");
        expect(shiftPeriod("2026-01", "month", -1)).toBe("2025-12");
        expect(shiftPeriod("2026-10", "quarter", 1)).toBe("2027-01");
        expect(shiftPeriod("2026-02-28", "day", 1)).toBe("2026-03-01");
        expect(shiftPeriod("2026", "year", -1)).toBe("2025");
    });

    it("lists every period from the first to the last, and stops at a limit", () => {
        expect(periodRange("2026-11", "2027-02", "month")).toEqual(["2026-11", "2026-12", "2027-01", "2027-02"]);
        expect(periodRange("2000-01-01", "2026-01-01", "day", 10)).toHaveLength(11);
    });
});

describe("formatPeriod", () => {
    it("prints each grain the way a person reads it", () => {
        expect(formatPeriod("2026-10", "month")).toBe("October 2026");
        expect(formatPeriod("2026-10-01", "quarter")).toBe("Q4 2026");
        expect(formatPeriod("2026", "year")).toBe("2026");
        expect(formatPeriod("2026-10-21", "day")).toBe("Oct 21, 2026");
    });
});
