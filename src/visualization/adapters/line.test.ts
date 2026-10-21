import {describe, expect, it} from "vitest";
import {funnelByMonth, monthlyRevenue, regionsByMonth} from "../fixtures.ts";
import {lineModel} from "./line.ts";

describe("lineModel", () => {
    it("draws one series for one measure, the periods oldest first and named as a person reads them", () => {
        const model = lineModel(monthlyRevenue, "en-US");
        expect(model.series).toHaveLength(1);
        expect(model.labels[0]).toBe("March 2026");
        expect(model.labels.at(-1)).toBe("October 2026");
        expect(model.series[0].points.at(-1)).toEqual({ value: 72300, text: "$72,300.00" });
        expect(model.seriesLabel).toBe("");
    });

    it("draws a series per measure, colored in the palette's order", () => {
        const model = lineModel(funnelByMonth);
        expect(model.series.map((s) => [s.name, s.color])).toEqual([["Clicks", "1"], ["Next step", "2"], ["Submitted", "3"]]);
    });

    it("draws a series per value of the category when there is one measure, and names them by the category", () => {
        const model = lineModel(regionsByMonth);
        expect(model.series.map((s) => s.name)).toEqual(["North", "South", "West"]);
        expect(model.seriesLabel).toBe("Region");
    });

    it("keeps a month with no data as a gap, so the axis stays true to the calendar", () => {
        const gap = { ...monthlyRevenue, rows: monthlyRevenue.rows.filter((r) => r.month !== "2026-05") };
        const model = lineModel(gap);
        expect(model.periods).toHaveLength(8);
        expect(model.periods[2]).toBe("2026-05");
        expect(model.series[0].points[2]).toEqual({ value: null, text: "" });
        expect(model.series[0].points[3].value).toBe(52400);
    });

    it("accepts dates in any of the forms and still puts them in one period", () => {
        const mixed = { ...monthlyRevenue, rows: [{ month: "2026-03-15", revenue: 10 }, { month: "2026-03", revenue: 5 }, { month: "2026-04-02", revenue: 7 }] };
        const model = lineModel(mixed);
        expect(model.periods).toEqual(["2026-03", "2026-04"]);
        expect(model.series[0].points.map((p) => p.value)).toEqual([15, 7]);
    });

    it("runs a day grain day by day and a quarter grain quarter by quarter", () => {
        const days = { ...monthlyRevenue, columns: [{ name: "month", role: "time" as const, grain: "day" as const }, monthlyRevenue.columns[1]], rows: [{ month: "2026-02-27", revenue: 1 }, { month: "2026-03-02", revenue: 2 }] };
        expect(lineModel(days).periods).toEqual(["2026-02-27", "2026-02-28", "2026-03-01", "2026-03-02"]);
        const quarters = { ...monthlyRevenue, columns: [{ name: "month", role: "time" as const, grain: "quarter" as const }, monthlyRevenue.columns[1]], rows: [{ month: "2025-11", revenue: 1 }, { month: "2026-08", revenue: 2 }] };
        expect(lineModel(quarters).labels).toEqual(["Q4 2025", "Q1 2026", "Q2 2026", "Q3 2026"]);
    });

    it("starts the axis at zero with round ticks", () => {
        const model = lineModel(monthlyRevenue, "en-US");
        expect(model.ticks[0]).toBe(0);
        expect(model.max).toBeGreaterThanOrEqual(72300);
        expect(model.tickTexts[1]).toBe("$20,000");
    });
});
