import {describe, expect, it} from "vitest";
import {spending} from "../fixtures.ts";
import {tableModel} from "./table.ts";

describe("tableModel", () => {
    it("lists every column by its label, in the order given, and marks the measures", () => {
        expect(tableModel(spending).headers).toEqual([
            { name: "month", numeric: false }, { name: "Category", numeric: false }, { name: "Spent", numeric: true },
        ]);
    });

    it("prints each cell by its unit and keeps the number for sorting", () => {
        const first = tableModel(spending, "en-US").rows[0];
        expect(first.map((c) => c.text)).toEqual(["October 2026", "Rent", "$1,850.00"]);
        expect(first[2].sort).toBe(1850);
        expect(first[0].sort).toBe("2026-10");
    });
});
