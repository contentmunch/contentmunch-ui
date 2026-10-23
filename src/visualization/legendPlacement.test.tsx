import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import {render} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import {Legend} from "./parts/Legend.tsx";
import {BAR_VIEWBOX_WIDTH, barLeftMargin} from "./plots/barLayout.ts";

const css = (name: string) => readFileSync(resolve(process.cwd(), "src/visualization/assets", name), "utf8");

describe("where the legend sits", () => {
    it("puts a donut's legend beside the ring, wrapping underneath only when there is no room", () => {
        expect(css("visualization.css")).toMatch(/\.muncher-viz--donut \.muncher-donut-chart\s*{[^}]*flex-flow:\s*row wrap/);
        expect(css("visualization.css")).toMatch(/\.muncher-viz--pie \.muncher-pie-chart\s*{[^}]*flex-flow:\s*row wrap/);
    });

    it("puts a line's legend above the plot as one wrapping row", () => {
        const viz = css("visualization.css");
        expect(viz).toMatch(/\.muncher-viz-legend\s*{[^}]*order:\s*-1[^}]*flex-flow:\s*row wrap/);
        expect(viz).toMatch(/\.muncher-line-chart\s*{[^}]*flex-direction:\s*column/);
    });

    it("makes a bar or line fill its container up to its size, even in a centred or flex one", () => {
        const viz = css("visualization.css");
        expect(viz).toMatch(/\.muncher-viz--bar\s*{[^}]*width:\s*100%;[^}]*max-width:\s*var\(--viz-width\)/);
        expect(viz).toMatch(/\.muncher-viz--line\s*{[^}]*width:\s*100%;[^}]*max-width:\s*var\(--viz-width\)/);
    });

    it("keeps the time slider's buttons right under its track, not a margin away", () => {
        expect(css("visualization.css")).toMatch(/\.muncher-time-slider \.muncher-slider\s*{[^}]*margin:\s*0/);
    });

    it("starts the legend where the axis starts", () => {
        const {container} = render(<Legend inset={barLeftMargin(false) / BAR_VIEWBOX_WIDTH} items={[{key: "a", label: "A", color: "1"}]}/>);
        expect((container.querySelector(".muncher-viz-legend") as HTMLElement).style.paddingLeft).toBe("18.97%");
        expect(barLeftMargin(true)).toBeGreaterThan(barLeftMargin(false));
    });
});
