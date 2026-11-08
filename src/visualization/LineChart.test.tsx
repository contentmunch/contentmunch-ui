import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {LineChart} from "./LineChart.tsx";
import {funnelByMonth, monthlyRevenue, regionsByMonth} from "./fixtures.ts";

describe("LineChart", () => {
    it("draws a line and a dot per period, in the palette", () => {
        const { container } = render(<LineChart data={monthlyRevenue}/>);
        expect(container.querySelectorAll(".line-series path")).toHaveLength(1);
        expect(container.querySelectorAll(".line-series circle")).toHaveLength(8);
        expect(container.querySelector(".line-series")?.getAttribute("stroke")).toBe("#4e79a7");
    });

    it("labels the last value directly when there is one line, and has no legend", () => {
        const { container } = render(<LineChart data={monthlyRevenue}/>);
        expect(container.querySelector(".line-value")).toHaveTextContent("$72,300.00");
        expect(container.querySelector(".muncher-viz-legend")).toBeNull();
    });

    it("shows a legend for several lines, titled by the category, and leaves it out when asked", () => {
        const { container, rerender } = render(<LineChart data={regionsByMonth}/>);
        expect(container.querySelector(".muncher-viz-legend")).toHaveTextContent("Region");
        expect(container.querySelectorAll(".line-series")).toHaveLength(3);
        rerender(<LineChart data={funnelByMonth} legend={false}/>);
        expect(container.querySelector(".muncher-viz-legend")).toBeNull();
    });

    it("is its numbers too, and says what it needs when it cannot draw", () => {
        const { container, rerender } = render(<LineChart data={monthlyRevenue}/>);
        expect(container.querySelectorAll("table.muncher-viz-sr tbody tr")).toHaveLength(8);
        rerender(<LineChart data={{ ...monthlyRevenue, columns: [monthlyRevenue.columns[1]] }}/>);
        expect(screen.getByRole("alert")).toHaveTextContent("A line needs a time column.");
    });

    it("refuses more than six lines", () => {
        const many = { ...regionsByMonth, rows: Array.from({ length: 7 }, (_, i) => ({ month: "2026-01", region: `R${i}`, sales: i })) };
        render(<LineChart data={many}/>);
        expect(screen.getByRole("alert")).toHaveTextContent(/at most 6 series/);
    });

    it("marks the period it is given with a cursor and each line's value there", () => {
        const { container } = render(<LineChart data={regionsByMonth} period="2026-02"/>);
        expect(container.querySelectorAll(".line-cursor")).toHaveLength(1);
        expect(container.querySelectorAll(".line-marked")).toHaveLength(3);
        expect(container.querySelector(".line-series")).toHaveTextContent("$150.00");
    });

    it("has no cursor without a period", () => {
        const { container } = render(<LineChart data={regionsByMonth}/>);
        expect(container.querySelector(".line-cursor")).toBeNull();
    });

    it("fades the other lines while a legend name is hovered or held", async () => {
        const { container } = render(<LineChart data={regionsByMonth}/>);
        const items = container.querySelectorAll<HTMLElement>(".muncher-viz-legend-item");
        const opacities = () => [...container.querySelectorAll(".line-series")].map((g) => g.getAttribute("opacity"));
        expect(new Set(opacities())).toEqual(new Set(["1"]));
        await userEvent.hover(items[0]);
        expect(opacities()[0]).toBe("1");
        expect(opacities().slice(1).every((o) => o === "0.2")).toBe(true);
        await userEvent.click(items[0]);
        await userEvent.unhover(items[0]);
        expect(opacities().slice(1).every((o) => o === "0.2")).toBe(true);
        await userEvent.click(items[0]);
        await userEvent.unhover(items[0]);
        expect(new Set(opacities())).toEqual(new Set(["1"]));
    });
});
