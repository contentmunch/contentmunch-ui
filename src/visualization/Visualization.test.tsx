import {describe, expect, it} from "vitest";
import {render} from "@testing-library/react";
import {Visualization} from "./Visualization.tsx";
import {fitting, KINDS} from "./registry.ts";
import {monthlyRevenue} from "./fixtures.ts";

describe("Visualization", () => {
    it("draws the same data as whichever kind it is asked for, with no change to the data", () => {
        const before = JSON.stringify(monthlyRevenue);
        for (const kind of fitting(monthlyRevenue)) {
            const { container, unmount } = render(<Visualization kind={kind} data={monthlyRevenue}/>);
            expect(container.querySelector(`.muncher-viz--${kind}`), kind).not.toBeNull();
            unmount();
        }
        expect(JSON.stringify(monthlyRevenue)).toBe(before);
    });

    it("knows six kinds", () => {
        expect(KINDS).toHaveLength(6);
    });
});
