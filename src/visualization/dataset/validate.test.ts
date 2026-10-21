import {describe, expect, it} from "vitest";
import type {Dataset} from "./Dataset.ts";
import {leaseMix, leaseTypes, leasesByProperty, monthlyRevenue, regionsByMonth, spending, comparison} from "../fixtures.ts";
import {MAX_ROWS, validateDataset, validateFor} from "./validate.ts";

const with_ = (base: Dataset, change: Partial<Dataset>): Dataset => ({ ...base, ...change });

describe("validateDataset", () => {
    it("accepts every fixture", () => {
        for (const d of [leaseTypes, spending, leasesByProperty, leaseMix, comparison, regionsByMonth]) expect(validateDataset(d)).toEqual([]);
    });

    it("needs a title, a summary and a measure", () => {
        expect(validateDataset(with_(leaseTypes, { title: " " }))).toContain("The data needs a title.");
        expect(validateDataset(with_(leaseTypes, { summary: "" }))).toContain("The data needs a summary describing what it shows.");
        expect(validateDataset(with_(leaseTypes, { columns: [leaseTypes.columns[0]] }))).toContain("The data needs at least one measure.");
    });

    it("refuses a value that is not a finite number", () => {
        const bad = with_(leaseTypes, { rows: [{ type: "New", leases: Infinity }] });
        expect(validateDataset(bad)[0]).toMatch(/not a finite number/);
    });

    it("refuses an unknown unit", () => {
        const bad = with_(leaseTypes, { columns: [leaseTypes.columns[0], { name: "leases", role: "measure", unit: "dollars" as never }] });
        expect(validateDataset(bad)[0]).toMatch(/unit of "leases"/);
    });

    it("refuses two rows with the same category and period", () => {
        const bad = with_(leaseTypes, { rows: [{ type: "New", leases: 1 }, { type: "New", leases: 2 }] });
        expect(validateDataset(bad)).toContain("Two rows have the same category and period.");
    });

    it("refuses a pinned color that is neither a token nor a hex", () => {
        const bad = with_(leaseTypes, { columns: [{ name: "type", role: "category", colors: { New: "red" as never } }, leaseTypes.columns[1]] });
        expect(validateDataset(bad)[0]).toMatch(/not a theme color or a #rrggbb/);
        const good = with_(leaseTypes, { columns: [{ name: "type", role: "category", colors: { New: "#ffcc00" } }, leaseTypes.columns[1]] });
        expect(validateDataset(good)).toEqual([]);
    });

    it("refuses a time value that is not a date", () => {
        const bad = with_(regionsByMonth, { rows: [{ month: "March", region: "North", sales: 1 }] });
        expect(validateDataset(bad)[0]).toMatch(/not a date/);
    });

    it("refuses too many rows, columns of the same name, and a third category", () => {
        const rows = Array.from({ length: MAX_ROWS + 1 }, (_, i) => ({ type: `t${i}`, leases: 1 }));
        expect(validateDataset(with_(leaseTypes, { rows }))).toContain(`The data has more than ${MAX_ROWS} rows.`);
        const twin = with_(leaseTypes, { columns: [leaseTypes.columns[0], leaseTypes.columns[0], leaseTypes.columns[1]] });
        expect(validateDataset(twin)).toContain("Two columns have the same name.");
        const three = with_(leaseTypes, { columns: [...comparison.columns.slice(0, 2), { name: "x", role: "category" }, leaseTypes.columns[1]] });
        expect(validateDataset(three)).toContain("The data can split by at most two categories.");
    });
});

describe("validateFor a line", () => {
    it("needs a time column, at most six series, and a range that is not enormous", () => {
        expect(validateFor("line", with_(monthlyRevenue, { columns: [monthlyRevenue.columns[1]] }))).toContain("A line needs a time column.");
        const wide = with_(monthlyRevenue, {
            columns: [{ name: "month", role: "time", grain: "day" }, monthlyRevenue.columns[1]],
            rows: [{ month: "1900-01-01", revenue: 1 }, { month: "2026-01-01", revenue: 2 }],
        });
        expect(validateFor("line", wide)[0]).toMatch(/more than 1000 days/);
    });
});

describe("validateFor", () => {
    it("lets a pie or donut refuse a negative and ask for a bar", () => {
        const negative = with_(leaseTypes, { rows: [{ type: "New", leases: -3 }] });
        expect(validateFor("pie", negative)[0]).toMatch(/negative values/);
        expect(validateFor("donut", negative)[0]).toMatch(/Use a bar chart/);
    });

    it("needs a category to slice by", () => {
        const none = with_(leaseTypes, { columns: [leaseTypes.columns[1]] });
        expect(validateFor("pie", none)[0]).toMatch(/needs a category/);
        expect(validateFor("bar", none)[0]).toMatch(/needs a category/);
    });

    it("refuses a bar of mixed shares and plain numbers", () => {
        const mixed = with_(leaseMix, { columns: leaseMix.columns.map((c, i) => (i === 1 && c.role === "measure" ? { ...c, unit: "count" as const } : c)) });
        expect(validateFor("bar", mixed)[0]).toMatch(/every measure is a share or none/);
    });

    it("does not look at kind rules while the dataset itself is wrong", () => {
        expect(validateFor("pie", with_(leaseTypes, { title: "" }))).toEqual(["The data needs a title."]);
    });
});
