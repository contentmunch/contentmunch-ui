import {describe, expect, it} from "vitest";
import {monthlyRevenue} from "../fixtures.ts";
import {kpiModel} from "./kpi.ts";

describe("kpiModel", () => {
    it("shows the latest period's value and the change from the one before", () => {
        const model = kpiModel(monthlyRevenue, null, "en-US");
        expect(model.valueText).toBe("$72,300.00");
        expect(model.periodText).toBe("October 2026");
        expect(model.change).toEqual({ direction: "up", deltaText: "+$5,500.00", percentText: "+8.2%", againstText: "September 2026" });
        expect(model.history).toHaveLength(8);
    });

    it("shows the period asked for, with the history only up to it", () => {
        const model = kpiModel(monthlyRevenue, "2026-06", "en-US");
        expect(model.valueText).toBe("$52,400.00");
        expect(model.history).toHaveLength(4);
        expect(model.change?.againstText).toBe("May 2026");
    });

    it("measures the change from the period right before by the calendar, and shows none when that month has no data", () => {
        const gap = { ...monthlyRevenue, rows: monthlyRevenue.rows.filter((r) => r.month !== "2026-09") };
        const model = kpiModel(gap, null, "en-US");
        expect(model.valueText).toBe("$72,300.00");
        expect(model.change).toBeNull();
        expect(model.history).toHaveLength(7);
        expect(kpiModel(gap, "2026-08", "en-US").change?.againstText).toBe("July 2026");
    });

    it("has no change for the first period, and says down when it fell", () => {
        expect(kpiModel(monthlyRevenue, "2026-03").change).toBeNull();
        const fell = { ...monthlyRevenue, rows: [{ month: "2026-01", revenue: 100 }, { month: "2026-02", revenue: 80 }] };
        expect(kpiModel(fell, null, "en-US").change).toMatchObject({ direction: "down", deltaText: "-$20.00", percentText: "-20%" });
    });
});
