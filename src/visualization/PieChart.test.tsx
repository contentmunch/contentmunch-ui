import {describe, expect, it, vi} from "vitest";
import {render, screen, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {PieChart} from "./PieChart.tsx";
import {leaseTypes, occupancy, spending} from "./fixtures.ts";

const slices = (c: HTMLElement) => [...c.querySelectorAll(".svg-pie-chart path")];

describe("PieChart", () => {
    it("draws one slice per part, in the order the data gives, with the pinned colors", () => {
        const { container } = render(<PieChart data={occupancy}/>);
        expect(slices(container).map((p) => p.getAttribute("fill"))).toEqual(["#59a14f", "#e15759"]);
    });

    it("hands out the palette in the order the parts come, the first color to the first part", () => {
        const { container } = render(<PieChart data={leaseTypes}/>);
        expect(slices(container).map((p) => p.getAttribute("fill"))).toEqual(["#4e79a7", "#59a14f", "#f28e2c", "#e15759"]);
    });

    it("titles the legend with the category and writes each part's count and share", () => {
        const { container } = render(<PieChart data={leaseTypes}/>);
        const legend = container.querySelector(".svg-pie-chart-legend") as HTMLElement;
        expect(legend).toHaveTextContent("Lease type");
        expect(legend).toHaveTextContent("Renewal (48: 48%)");
    });

    it("is also its numbers: a hidden table, the title and the summary", () => {
        const { container } = render(<PieChart data={leaseTypes}/>);
        expect(container.querySelector("figcaption")).toHaveTextContent(leaseTypes.title);
        expect(container.querySelectorAll("table.muncher-viz-sr tbody tr")).toHaveLength(4);
        expect(container).toHaveTextContent(leaseTypes.summary);
    });

    it("leaves the legend out when asked", () => {
        const { container } = render(<PieChart data={leaseTypes} legend={false}/>);
        expect(container.querySelector(".svg-pie-chart-legend")).toBeNull();
    });

    it("groups what is past six into Other", () => {
        const { container } = render(<PieChart data={spending}/>);
        expect(slices(container)).toHaveLength(6);
        expect(container.querySelector(".svg-pie-chart-legend")).toHaveTextContent("Other");
    });

    it("reports the key of a clicked slice, and none when the selected one is clicked again", async () => {
        const onSelect = vi.fn();
        const { container, rerender } = render(<PieChart data={occupancy} onSelect={onSelect}/>);
        await userEvent.click(slices(container)[1]);
        expect(onSelect).toHaveBeenLastCalledWith("Vacant");
        rerender(<PieChart data={occupancy} selected="Vacant" onSelect={onSelect}/>);
        await userEvent.click(slices(container)[1]);
        expect(onSelect).toHaveBeenLastCalledWith(null);
    });

    it("marks the selected part", () => {
        const { container } = render(<PieChart data={occupancy} selected="Vacant"/>);
        expect(slices(container)[1]).toHaveClass("selected");
        expect(slices(container)[0]).not.toHaveClass("selected");
    });

    it("sizes by preset: the same factor for every kind", () => {
        const { container, rerender } = render(<PieChart data={leaseTypes}/>);
        expect((container.querySelector("figure") as HTMLElement).style.getPropertyValue("--viz-diameter")).toBe("220px");
        rerender(<PieChart data={leaseTypes} size="small"/>);
        expect((container.querySelector("figure") as HTMLElement).style.getPropertyValue("--viz-diameter")).toBe("165px");
        rerender(<PieChart data={leaseTypes} size="large"/>);
        expect((container.querySelector("figure") as HTMLElement).style.getPropertyValue("--viz-diameter")).toBe("253px");
    });

    it("shows the period it is given", () => {
        const { container } = render(<PieChart data={spending} period="2026-09"/>);
        expect(slices(container)).toHaveLength(2);
    });

    it("says why it cannot draw bad data, and that there is nothing to draw for empty data", () => {
        const { rerender } = render(<PieChart data={{ ...leaseTypes, rows: [{ type: "New", leases: -4 }] }}/>);
        expect(screen.getByRole("alert")).toHaveTextContent(/can.t be drawn.*negative/i);
        rerender(<PieChart data={{ ...leaseTypes, rows: [] }}/>);
        expect(within(document.body).getByRole("status")).toHaveTextContent("No data to show.");
    });
});
