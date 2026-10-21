import {describe, expect, it} from "vitest";
import {assignColors, colorHex, isColor} from "./colors.ts";

describe("assignColors", () => {
    it("hands out the palette in the order the values first appear", () => {
        const colors = assignColors(["Rent", "Food", "Fun", "Food"]);
        expect([colors.get("Rent"), colors.get("Food"), colors.get("Fun")]).toEqual(["1", "2", "3"]);
    });

    it("keeps a pinned color and does not spend a palette slot on it", () => {
        const colors = assignColors(["Occupied", "Vacant", "Other"], { Occupied: "good", Vacant: "bad" });
        expect(colors.get("Occupied")).toBe("good");
        expect(colors.get("Vacant")).toBe("bad");
        expect(colors.get("Other")).toBe("1");
    });

    it("wraps after eight", () => {
        const keys = Array.from({ length: 10 }, (_, i) => `k${i}`);
        expect(assignColors(keys).get("k8")).toBe("1");
    });
});

describe("colorHex", () => {
    it("draws a token with the palette the charts have always used, and a chosen color as it is", () => {
        expect(colorHex("1")).toBe("#4e79a7");
        expect(colorHex("7")).toBe("#daf2dc");
        expect(colorHex("bad")).toBe("#e15759");
        expect(colorHex("#ffcc00")).toBe("#ffcc00");
    });
});

describe("isColor", () => {
    it("accepts a token or a #rrggbb, and nothing else", () => {
        for (const c of ["1", "8", "good", "neutral", "#12abEF"]) expect(isColor(c)).toBe(true);
        for (const c of ["9", "red", "#12345", "#12345g", 3, null]) expect(isColor(c)).toBe(false);
    });
});
