import {describe, expect, it} from "vitest";
import {comparison, leaseTypes, monthlyRevenue, regionsByMonth, spending, funnelByMonth} from "./fixtures.ts";
import {fitting} from "./registry.ts";

describe("fitting", () => {
    it("offers the kinds that can draw the data, best first", () => {
        expect(fitting(leaseTypes)).toEqual(["bar", "donut", "pie", "table"]);
        expect(fitting(monthlyRevenue)).toEqual(["line", "kpi", "table"]);
        expect(fitting(funnelByMonth)).toEqual(["line", "table", "kpi"]);
        expect(fitting(regionsByMonth).slice(0, 3)).toEqual(["line", "bar", "table"]);
    });

    it("leaves out kinds the data cannot satisfy", () => {
        expect(fitting(comparison)).toEqual(["bar", "table"]);
        expect(fitting({ ...leaseTypes, rows: [{ type: "New", leases: -2 }] })).toEqual(["table"]);
        expect(fitting(spending)).toContain("donut");
        expect(fitting({ ...monthlyRevenue, title: "" })).toEqual([]);
    });
});
