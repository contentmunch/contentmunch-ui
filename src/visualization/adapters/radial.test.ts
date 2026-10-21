import {describe, expect, it} from "vitest";
import {leaseTypes, occupancy, spending} from "../fixtures.ts";
import {MAX_SLICES, OTHER, radialModel} from "./radial.ts";

describe("radialModel", () => {
    it("keeps the order the data gives and gives each slice its share", () => {
        const model = radialModel({ ...leaseTypes, rows: [...leaseTypes.rows].reverse() }, null, "en-US");
        expect(model.slices.map((s) => s.key)).toEqual(["Vacant", "Extension", "New", "Renewal"]);
        expect(model.slices[3]).toMatchObject({ value: 48, shareText: "48%", valueText: "48" });
    });

    it("gives each slice its share", () => {
        const model = radialModel(leaseTypes, null, "en-US");
        expect(model.slices[0]).toMatchObject({ value: 48, shareText: "48%", valueText: "48" });
        expect(model.total).toBe(100);
    });

    it("keeps a pinned color on its category", () => {
        const model = radialModel(occupancy);
        expect(model.slices.find((s) => s.key === "Occupied")?.color).toBe("good");
        expect(model.slices.find((s) => s.key === "Vacant")?.color).toBe("bad");
    });

    it("groups everything past six into Other, in neutral", () => {
        const model = radialModel(spending, null, "en-US");
        expect(model.slices).toHaveLength(MAX_SLICES);
        expect(model.slices.slice(0, -1).map((s) => s.key)).toEqual(["Rent", "Groceries", "Transport", "Utilities", "Dining"]);
        const other = model.slices.at(-1)!;
        expect(other).toMatchObject({ key: OTHER, color: "neutral" });
        expect(other.value).toBe(42 + 30 + 12 + 95);
        expect(model.slices.reduce((a, s) => a + s.share, 0)).toBeCloseTo(1);
    });

    it("keeps a category's color the same whether or not it ends up in Other", () => {
        const all = radialModel(spending);
        const month = radialModel(spending, "2026-09");
        expect(month.slices.find((s) => s.key === "Rent")?.color).not.toBe("neutral");
        expect(all.slices.find((s) => s.key === "Rent")?.color).toBe(month.slices.find((s) => s.key === "Rent")?.color);
    });

    it("shows one period: the latest by default, and names it in the middle", () => {
        const latest = radialModel(spending, null, "en-US");
        expect(latest.centerLabel).toBe("October 2026");
        expect(latest.totalText).toBe("$3,255.90");
        const earlier = radialModel(spending, "2026-09", "en-US");
        expect(earlier.centerLabel).toBe("September 2026");
        expect(earlier.slices.map((s) => s.key)).toEqual(["Rent", "Groceries"]);
    });

    it("names the measure in the middle when there is no time column", () => {
        expect(radialModel(leaseTypes).centerLabel).toBe("Leases");
    });

    it("keeps a part worth nothing, last, so it can still be listed and chosen", () => {
        const model = radialModel({ ...leaseTypes, rows: [{ type: "New", leases: 5 }, { type: "Vacant", leases: 0 }] });
        expect(model.slices.map((s) => [s.key, s.share])).toEqual([["New", 1], ["Vacant", 0]]);
    });
});
