import {describe, expect, it} from "vitest";
import {dailyVisits, quarterlyRevenue, spendingOverTime, yearlyByChannel} from "./fixtures.ts";
import {validateFor} from "./dataset/validate.ts";
import {lineModel} from "./adapters/line.ts";

describe("the time-series fixtures", () => {
    it("are valid for a line", () => {
        for (const data of [dailyVisits, quarterlyRevenue, yearlyByChannel, spendingOverTime]) expect(validateFor("line", data)).toEqual([]);
    });

    it("show their gaps and grains", () => {
        const days = lineModel(dailyVisits);
        expect(days.periods).toHaveLength(30);
        expect(days.series[0].points.filter((p) => p.value === null)).toHaveLength(2);
        expect(lineModel(quarterlyRevenue).labels.slice(0, 2)).toEqual(["Q1 2024", "Q2 2024"]);
        expect(lineModel(yearlyByChannel).series.map((s) => s.name)).toEqual(["Online", "Retail"]);
    });
});
