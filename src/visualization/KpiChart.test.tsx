import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import {KpiChart} from "./KpiChart.tsx";
import {monthlyRevenue} from "./fixtures.ts";

describe("KpiChart", () => {
    it("shows the latest value large, with its label and period", () => {
        const { container } = render(<KpiChart data={monthlyRevenue}/>);
        expect(container.querySelector(".muncher-kpi-value")).toHaveTextContent("$72,300.00");
        expect(container.querySelector(".muncher-kpi-label")).toHaveTextContent("Revenue · October 2026");
    });

    it("says which way it is heading, from which period", () => {
        const { container } = render(<KpiChart data={monthlyRevenue}/>);
        expect(container.querySelector(".muncher-kpi-change")).toHaveTextContent("+$5,500.00 (+8.2%) from September 2026");
    });

    it("draws its history, except for the first period, which has none to show", () => {
        const { container, rerender } = render(<KpiChart data={monthlyRevenue}/>);
        expect(container.querySelector(".muncher-kpi-history polyline")).not.toBeNull();
        rerender(<KpiChart data={monthlyRevenue} period="2026-03"/>);
        expect(container.querySelector(".muncher-kpi-history")).toBeNull();
        expect(container.querySelector(".muncher-kpi-change")).toBeNull();
    });

    it("shows the period it is given", () => {
        const { container } = render(<KpiChart data={monthlyRevenue} period="2026-06"/>);
        expect(container.querySelector(".muncher-kpi-value")).toHaveTextContent("$52,400.00");
    });

    it("needs a time column", () => {
        render(<KpiChart data={{ ...monthlyRevenue, columns: [monthlyRevenue.columns[1]] }}/>);
        expect(screen.getByRole("alert")).toHaveTextContent("A KPI needs a time column.");
    });
});
