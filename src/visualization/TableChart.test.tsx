import {describe, expect, it} from "vitest";
import {render, screen, within} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {TableChart} from "./TableChart.tsx";
import {leasesByProperty, spending} from "./fixtures.ts";

const column = (c: HTMLElement, index: number) => [...c.querySelectorAll(".row:not(.head)")].map((r) => r.querySelectorAll(".col")[index]?.textContent);

describe("TableChart", () => {
    it("lists every row with the columns in the order given, numbers printed by their unit", () => {
        const { container } = render(<TableChart data={spending}/>);
        expect(container.querySelectorAll(".row:not(.head)")).toHaveLength(11);
        expect(column(container, 0)[0]).toBe("October 2026");
        expect(column(container, 2)[0]).toBe("$1,850.00");
    });

    it("sorts a number column as numbers, not as text", async () => {
        const { container } = render(<TableChart data={leasesByProperty}/>);
        const header = [...container.querySelectorAll(".row.head .col")].find((c) => c.textContent === "Renewal") as HTMLElement;
        await userEvent.click(within(header).getByRole("button"));
        expect(column(container, 2)).toEqual(["5", "6", "7", "8", "9"]);
    });

    it("has no second, hidden copy of the numbers, and no download or pager for a short list", () => {
        const { container } = render(<TableChart data={spending}/>);
        expect(container.querySelector("table.muncher-viz-sr")).toBeNull();
        expect(container.querySelector(".pagination")).toBeNull();
    });

    it("says what is wrong, or that there is nothing to show", () => {
        const { rerender } = render(<TableChart data={{ ...spending, title: "" }}/>);
        expect(screen.getByRole("alert")).toHaveTextContent("The data needs a title.");
        rerender(<TableChart data={{ ...spending, rows: [] }}/>);
        expect(screen.getByRole("status")).toHaveTextContent("No data to show.");
    });
});
