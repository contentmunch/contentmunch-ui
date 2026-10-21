import {describe, expect, it} from "vitest";
import {comparison, leaseMix, leasesByProperty, regionsByMonth, twoMonths} from "../fixtures.ts";
import {barPlotInput} from "./barPlot.ts";

describe("barPlotInput", () => {
    it("stacks the measures, with a total per category and the categories in the order given", () => {
        const input = barPlotInput(leasesByProperty);
        expect(input.data.stackFields).toEqual(["New", "Renewal", "Extension", "Vacant"]);
        expect(input.data.values.map((v) => v.Title)).toEqual(["Harbour", "Verona Park", "Scholars Quad", "High Grove", "Summer House"]);
        expect(input.data.values[0]).toMatchObject({ New: 4, Renewal: 9, Extension: 2, Vacant: 1, Total: 16 });
        expect(input.comparisonData).toBeUndefined();
        expect(input.toPercentage).toBe(false);
    });

    it("scales to percentages when every measure is a share", () => {
        expect(barPlotInput(leaseMix).toPercentage).toBe(true);
    });

    it("gives each measure a color: its own pin, or the palette in order", () => {
        expect(barPlotInput(leasesByProperty).colorRange).toEqual(["#4e79a7", "#59a14f", "#f28e2c", "#e15759"]);
        const pinned = {
            ...leasesByProperty,
            columns: leasesByProperty.columns.map((c) => (c.name === "Vacant" && c.role === "measure" ? { ...c, color: "#123456" as const } : c)),
        };
        expect(barPlotInput(pinned).colorRange.at(-1)).toBe("#123456");
    });

    it("splits a second category into the data and the comparison, titled property, separator, group", () => {
        const input = barPlotInput(comparison);
        expect(input.groups).toEqual(["Jan to Mar 2026", "Jan to Mar 2025"]);
        expect(input.data.values.map((v) => v.Title)).toEqual(["Harbour:Jan to Mar 2026", "Verona Park:Jan to Mar 2026", "Scholars Quad:Jan to Mar 2026"]);
        expect(input.comparisonData?.values.map((v) => v.Title)).toEqual(["Harbour:Jan to Mar 2025", "Verona Park:Jan to Mar 2025", "Scholars Quad:Jan to Mar 2025"]);
        expect(input.data.titleSeparator).toBe(":");
    });

    it("compares two periods, oldest first, and shows one when there are more", () => {
        expect(barPlotInput(twoMonths).groups).toEqual(["February 2026", "March 2026"]);
        const one = barPlotInput(regionsByMonth, "2026-02");
        expect(one.groups).toEqual([]);
        expect(one.data.values.map((v) => v.Total)).toEqual([150, 145, 70]);
    });

    it("shows the period asked for on its own, even when there are only two to compare", () => {
        const one = barPlotInput(twoMonths, "2026-03");
        expect(one.groups).toEqual([]);
        expect(one.data.values.map((v) => v.Total)).toEqual([180, 200, 80]);
    });

    it("keeps every category in every period, empty when it has no value, and one axis for all of them", () => {
        const sparse = { ...regionsByMonth, rows: regionsByMonth.rows.filter((r) => !(r.region === "West" && r.month === "2026-01")) };
        const first = barPlotInput(sparse, "2026-01");
        expect(first.data.values.map((v) => [v.Title, v.Total])).toEqual([["North", 120], ["South", 90], ["West", 0]]);
        const last = barPlotInput(sparse, "2026-03");
        expect(last.axisMax).toBe(first.axisMax);
        expect(first.axisMax).toBe(200);
    });
});
