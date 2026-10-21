import {describe, expect, it, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {DonutChart} from "./DonutChart.tsx";
import {leaseTypes, spending} from "./fixtures.ts";

const middle = (container: HTMLElement) => ({
    label: container.querySelector(".muncher-donut-chart-center-label")?.textContent,
    value: container.querySelector(".muncher-donut-chart-center-value")?.textContent,
});

describe("DonutChart", () => {
    it("shows the period and the total in the middle", () => {
        const { container } = render(<DonutChart data={spending}/>);
        expect(middle(container)).toEqual({ label: "October 2026", value: "$3,255.90" });
    });

    it("shows the selected part and its amount in the middle instead", () => {
        const { container } = render(<DonutChart data={spending} selected="Groceries"/>);
        expect(middle(container)).toEqual({ label: "Groceries", value: "$612.40" });
    });

    it("shows the measure's name when the data has no period", () => {
        const { container } = render(<DonutChart data={leaseTypes}/>);
        expect(middle(container)).toEqual({ label: "Leases", value: "100" });
    });

    it("follows the period it is given", () => {
        const { container } = render(<DonutChart data={spending} period="2026-09"/>);
        expect(middle(container)).toEqual({ label: "September 2026", value: "$2,430.00" });
    });

    it("titles the legend with the category and lists each part with its amount and share", () => {
        const { container } = render(<DonutChart data={spending}/>);
        const legend = container.querySelector(".muncher-donut-chart-legend") as HTMLElement;
        expect(legend).toHaveTextContent("Category");
        expect(legend).toHaveTextContent("Rent ($1,850.00: 57%)");
    });

    it("leaves the legend out when asked", () => {
        const { container } = render(<DonutChart data={spending} legend={false}/>);
        expect(container.querySelector(".muncher-donut-chart-legend")).toBeNull();
    });

    it("reports a chosen part, and none when it is chosen again", async () => {
        const onSelect = vi.fn();
        const { container, rerender } = render(<DonutChart data={leaseTypes} onSelect={onSelect}/>);
        await userEvent.click(container.querySelectorAll(".muncher-donut-slice")[1]);
        expect(onSelect).toHaveBeenLastCalledWith("New");
        rerender(<DonutChart data={leaseTypes} selected="New" onSelect={onSelect}/>);
        await userEvent.click(container.querySelectorAll(".muncher-donut-slice")[1]);
        expect(onSelect).toHaveBeenLastCalledWith(null);
    });

    it("sizes by the same factor as every kind", () => {
        const { container } = render(<DonutChart data={leaseTypes} size="large"/>);
        expect((container.querySelector(".muncher-donut-chart-graphic") as HTMLElement).style.width).toBe("253px");
    });

    it("says why it cannot draw bad data", () => {
        render(<DonutChart data={{ ...leaseTypes, rows: [{ type: "New", leases: -1 }] }}/>);
        expect(screen.getByRole("alert")).toHaveTextContent(/negative/i);
    });
});
