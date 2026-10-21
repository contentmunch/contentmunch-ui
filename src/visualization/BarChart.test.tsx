import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import {BarChart} from "./BarChart.tsx";
import {comparison, leaseMix, leasesByProperty, regionsByMonth, twoMonths} from "./fixtures.ts";

const bars = (c: HTMLElement) => c.querySelectorAll("rect.bar-rectangle");

describe("BarChart", () => {
    it("draws a segment per measure in each bar, with the legend of the measures", () => {
        const { container } = render(<BarChart data={leasesByProperty}/>);
        expect(bars(container)).toHaveLength(5 * 4);
        expect(container.querySelector(".svg-bar-chart-legend")).toHaveTextContent("Renewal");
    });

    it("colors each measure from the palette in order", () => {
        const { container } = render(<BarChart data={leasesByProperty}/>);
        const fills = [...container.querySelectorAll(".svg-bar-chart g[fill]")].map((g) => g.getAttribute("fill"));
        expect([...new Set(fills)].filter((f) => f !== "none")).toEqual(["#4e79a7", "#59a14f", "#f28e2c", "#e15759"]);
    });

    it("scales every bar to 100% when the measures are shares", () => {
        const { container } = render(<BarChart data={leaseMix}/>);
        const ticks = [...container.querySelectorAll(".tick text")].map((t) => t.textContent);
        expect(ticks).toContain("100%");
    });

    it("puts the two groups of a comparison side by side, one bar each", () => {
        const { container } = render(<BarChart data={comparison}/>);
        expect(bars(container)).toHaveLength(6 * 4);
        expect(container).toHaveTextContent("Harbour:Jan to Mar 2026");
        expect(container).toHaveTextContent("Harbour:Jan to Mar 2025");
    });

    it("compares two periods of a time column the same way, naming them as a person reads them", () => {
        const { container } = render(<BarChart data={twoMonths}/>);
        expect(bars(container)).toHaveLength(6);
        expect(container).toHaveTextContent("North:February 2026");
        expect(container).toHaveTextContent("North:March 2026");
    });

    it("shows one period at a time when there are more than two", () => {
        const { container } = render(<BarChart data={regionsByMonth}/>);
        expect(bars(container)).toHaveLength(3);
        const { container: earlier } = render(<BarChart data={regionsByMonth} period="2026-01"/>);
        expect(bars(earlier)).toHaveLength(3);
    });

    it("sizes by the same factor as every kind", () => {
        const { container } = render(<BarChart data={leasesByProperty} size="small"/>);
        expect((container.querySelector("figure") as HTMLElement).style.getPropertyValue("--viz-width")).toBe("540px");
    });

    it("is its numbers too: a hidden table with every row", () => {
        const { container } = render(<BarChart data={leasesByProperty}/>);
        expect(container.querySelectorAll("table.muncher-viz-sr tbody tr")).toHaveLength(5);
    });

    it("refuses negatives and more than two groups, and says so", () => {
        const negative = { ...leasesByProperty, rows: [{ property: "Harbour", New: -1, Renewal: 2, Extension: 1, Vacant: 0 }] };
        const { rerender } = render(<BarChart data={negative}/>);
        expect(screen.getByRole("alert")).toHaveTextContent(/negative/i);
        const three = {
            ...comparison,
            rows: [...comparison.rows, { property: "Harbour", range: "Jan to Mar 2024", New: 1, Renewal: 1, Extension: 1, Vacant: 1 }],
        };
        rerender(<BarChart data={three}/>);
        expect(screen.getByRole("alert")).toHaveTextContent(/two groups at most/i);
    });

    it("has a state for no rows", () => {
        render(<BarChart data={{ ...leasesByProperty, rows: [] }}/>);
        expect(screen.getByRole("status")).toHaveTextContent("No data to show.");
    });
});
