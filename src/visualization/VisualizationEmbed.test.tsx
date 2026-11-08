import {StrictMode} from "react";
import {beforeEach, describe, expect, it, vi} from "vitest";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {NoteWidgetClientProvider} from "../note/NoteWidgetClientProvider.tsx";
import {RenderedNoteContent} from "../note/RenderedNoteContent.tsx";
import {forgetVisualization, VisualizationDirectiveError, VisualizationEmbed} from "./VisualizationEmbed.tsx";
import type {StoredVisualization} from "./VisualizationWidgetClient.ts";

const stored = (overrides: Partial<StoredVisualization> = {}): StoredVisualization => ({
    kind: "bar",
    title: "Leases by property",
    caption: "From the leasing system",
    summary: "Leases at two properties.",
    data: {
        shape: "dataset.v1",
        tables: {
            main: {
                columns: [
                    {name: "property", role: "category"},
                    {name: "New", role: "measure", unit: "count"},
                    {name: "Renewal", role: "measure", unit: "count"},
                ],
                rows: [{property: "Harbour", New: 4, Renewal: 9}, {property: "Verona Park", New: 5, Renewal: 8}],
            },
        },
    },
    options: {},
    ...overrides,
});

const getVisualization = vi.fn();
const withClient = (ui: React.ReactNode) => <NoteWidgetClientProvider visualization={{getVisualization}}>{ui}</NoteWidgetClientProvider>;

beforeEach(() => {
    forgetVisualization();
    getVisualization.mockReset().mockResolvedValue(stored());
});

describe("VisualizationEmbed", () => {
    it("draws the stored visualization as the kind it is, with its own caption", async () => {
        const {container} = render(withClient(<VisualizationEmbed data-viz-nid="vz/vzab"/>));
        await waitFor(() => expect(container.querySelector(".muncher-viz--bar")).not.toBeNull());
        expect(container.querySelectorAll("rect.bar-rectangle")).toHaveLength(4);
        expect(screen.getByText("From the leasing system")).toBeInTheDocument();
        expect(getVisualization).toHaveBeenCalledWith("vz", "vzab");
    });

    it("draws another kind when the stored kind changes, with no change to the note", async () => {
        getVisualization.mockResolvedValue(stored({kind: "table"}));
        const {container} = render(withClient(<VisualizationEmbed data-viz-nid="vz/vzab"/>));
        await waitFor(() => expect(container.querySelector(".muncher-viz--table")).not.toBeNull());
    });

    it("uses this use's caption when text is given, and its size", async () => {
        const {container} = render(withClient(<VisualizationEmbed data-viz-nid="vz/vzab" data-viz-size="large" data-viz-static="true" data-viz-text="Our numbers"/>));
        expect(await screen.findByText("Our numbers")).toBeInTheDocument();
        expect(screen.queryByText("From the leasing system")).not.toBeInTheDocument();
        expect((container.querySelector("figure") as HTMLElement).style.getPropertyValue("--viz-width")).toBe("828px");
    });

    it("always has a legend, and leaves it out only where the use says legend=false", async () => {
        const shown = render(withClient(<VisualizationEmbed data-viz-nid="vz/vzab"/>));
        await waitFor(() => expect(shown.container.querySelector(".muncher-viz-legend")).not.toBeNull());
        shown.unmount();
        const hidden = render(withClient(<VisualizationEmbed data-viz-nid="vz/vzab" data-viz-legend="false"/>));
        await waitFor(() => expect(hidden.container.querySelector(".muncher-viz--bar")).not.toBeNull());
        expect(hidden.container.querySelector(".muncher-viz-legend")).toBeNull();
        // the wrapper keeps the choice, so an editor snapshot of it (what a note stores) still says legend=false
        expect(hidden.container.querySelector("[data-viz-nid]")?.getAttribute("data-viz-legend")).toBe("false");
        expect(shown.container.querySelector("[data-viz-legend]")).toBeNull();
    });

    it("fetches an address once however many times it is shown, and again after it is forgotten", async () => {
        const {container} = render(withClient(<><VisualizationEmbed data-viz-nid="vz/vzab"/><VisualizationEmbed data-viz-nid="vz/vzab"/></>));
        await waitFor(() => expect(container.querySelectorAll(".muncher-viz--bar")).toHaveLength(2));
        expect(getVisualization).toHaveBeenCalledTimes(1);
        forgetVisualization("vz/vzab");
        render(withClient(<VisualizationEmbed data-viz-nid="vz/vzab"/>));
        await waitFor(() => expect(getVisualization).toHaveBeenCalledTimes(2));
    });

    it("says so when it cannot find it, does not know the kind, or has no nid", async () => {
        getVisualization.mockRejectedValue(new Error("404"));
        const first = render(withClient(<VisualizationEmbed data-viz-nid="vz/nope"/>));
        expect(await screen.findByText('Could not find the visualization "vz/nope"')).toBeInTheDocument();
        first.unmount();
        getVisualization.mockResolvedValue(stored({kind: "heatmap"}));
        const second = render(withClient(<VisualizationEmbed data-viz-nid="vz/heat"/>));
        expect(await screen.findByText(/kind of visualization this page does not know \(heatmap\)/)).toBeInTheDocument();
        second.unmount();
        render(withClient(<VisualizationEmbed/>));
        expect(screen.getByText("::viz is missing a required nid attribute")).toBeInTheDocument();
    });

    it("says why the data cannot be drawn as the kind chosen", async () => {
        getVisualization.mockResolvedValue(stored({kind: "line"}));
        render(withClient(<VisualizationEmbed data-viz-nid="vz/line"/>));
        expect(await screen.findByRole("alert")).toHaveTextContent("A line needs a time column.");
    });

    it("needs a client in a provider, and has an error element for a directive it cannot read", () => {
        const quiet = vi.spyOn(console, "error").mockImplementation(() => undefined);
        expect(() => render(<VisualizationEmbed data-viz-nid="vz/vzab"/>)).toThrow(/NoteWidgetClientProvider/);
        quiet.mockRestore();
        render(<VisualizationDirectiveError/>);
        expect(screen.getByText("Invalid ::viz directive")).toBeInTheDocument();
    });
});

describe("a stored note with a visualization in it", () => {
    it("shows the chart where the marker is, with this use's caption from the marker", async () => {
        const xhtml = '<article xmlns="http://www.w3.org/1999/xhtml"><p>Before</p><div data-viz-nid="vz/vzab" data-viz-size="small" data-viz-static="true"><span data-link-text="">Q3 revenue</span></div><p>After</p></article>';
        const {container} = render(withClient(<RenderedNoteContent xhtml={xhtml}/>));
        await waitFor(() => expect(container.querySelector(".muncher-viz--bar")).not.toBeNull());
        expect(screen.getByText("Q3 revenue")).toBeInTheDocument();
        expect(screen.queryByText("From the leasing system")).not.toBeInTheDocument();
        expect(container.querySelector(".viz-embed--small")).not.toBeNull();
        expect(screen.getByText("Before")).toBeInTheDocument();
        expect(screen.getByText("After")).toBeInTheDocument();
    });

    it("shows the visualization's own caption when the marker has none", async () => {
        const {container} = render(withClient(<RenderedNoteContent xhtml='<article xmlns="http://www.w3.org/1999/xhtml"><div data-viz-nid="vz/vzab"></div></article>'/>));
        expect(await screen.findByText("From the leasing system")).toBeInTheDocument();
        expect(container.querySelectorAll(".muncher-viz--bar")).toHaveLength(1);
    });

    it("keeps this use's caption when the hydration runs twice, as React does in development", async () => {
        const xhtml = '<article xmlns="http://www.w3.org/1999/xhtml"><div data-viz-nid="vz/vzab" data-viz-static="true"><span data-link-text="">Twice over</span></div></article>';
        render(withClient(<StrictMode><RenderedNoteContent xhtml={xhtml}/></StrictMode>));
        expect(await screen.findByText("Twice over")).toBeInTheDocument();
    });

    it("takes the legend choice of this use from the marker in a stored note", async () => {
        const {container} = render(withClient(<RenderedNoteContent xhtml='<article xmlns="http://www.w3.org/1999/xhtml"><div data-viz-nid="vz/vzab" data-viz-legend="false"></div></article>'/>));
        await waitFor(() => expect(container.querySelector(".muncher-viz--bar")).not.toBeNull());
        expect(container.querySelector(".muncher-viz-legend")).toBeNull();
    });

    it("draws this use as another kind when it asks, and keeps asking in the markup it leaves", async () => {
        const {container} = render(withClient(<VisualizationEmbed data-viz-nid="vz/vzab" data-viz-kind="table"/>));
        await waitFor(() => expect(container.querySelector(".muncher-viz--table")).not.toBeNull());
        expect(container.querySelector(".muncher-viz--bar")).toBeNull();
        expect((container.querySelector("[data-viz-nid]") as HTMLElement).getAttribute("data-viz-kind")).toBe("table");
    });

    it("reads the numbers once for a chart and its table in the same note", async () => {
        const {container} = render(withClient(<><VisualizationEmbed data-viz-nid="vz/vzab"/><VisualizationEmbed data-viz-nid="vz/vzab" data-viz-kind="table"/></>));
        await waitFor(() => expect(container.querySelector(".muncher-viz--table")).not.toBeNull());
        expect(container.querySelector(".muncher-viz--bar")).not.toBeNull();
        expect(getVisualization).toHaveBeenCalledTimes(1);
    });

    it("says so when the data cannot be drawn as the kind asked", async () => {
        render(withClient(<VisualizationEmbed data-viz-nid="vz/vzab" data-viz-kind="line"/>));
        expect(await screen.findByText(/cannot be shown as a line: A line needs a time column/)).toBeInTheDocument();
    });

    it("says so when the kind asked is not one it knows", async () => {
        render(withClient(<VisualizationEmbed data-viz-nid="vz/vzab" data-viz-kind="radar"/>));
        expect(await screen.findByText(/a kind this page does not know/)).toBeInTheDocument();
    });

    it("takes the kind of this use from the marker in a stored note", async () => {
        const {container} = render(withClient(<RenderedNoteContent xhtml='<article xmlns="http://www.w3.org/1999/xhtml"><div data-viz-nid="vz/vzab" data-viz-kind="table"></div></article>'/>));
        await waitFor(() => expect(container.querySelector(".muncher-viz--table")).not.toBeNull());
    });

    describe("picking a part of a donut", () => {
        const donut = () => stored({
            kind: "donut",
            data: {
                shape: "dataset.v1",
                tables: {main: {columns: [{name: "part", role: "category"}, {name: "MB", role: "measure", unit: "count"}], rows: [{part: "Rent", MB: 60}, {part: "Food", MB: 40}]}},
            },
        });
        const middle = (container: HTMLElement) => container.querySelector(".muncher-donut-chart-center-label")?.textContent;

        it("shows the part a reader clicks in the middle, and the total again when it is clicked again", async () => {
            getVisualization.mockResolvedValue(donut());
            const {container} = render(withClient(<VisualizationEmbed data-viz-nid="vz/vzab"/>));
            await waitFor(() => expect(container.querySelector(".muncher-donut-slice")).not.toBeNull());
            const before = middle(container);

            await userEvent.click(container.querySelectorAll(".muncher-donut-slice")[1]);
            expect(middle(container)).toBe("Food");

            await userEvent.click(container.querySelectorAll(".muncher-donut-slice")[1]);
            expect(middle(container)).toBe(before);
        });

        it("picks the same part from its legend entry", async () => {
            getVisualization.mockResolvedValue(donut());
            const {container} = render(withClient(<VisualizationEmbed data-viz-nid="vz/vzab"/>));
            await waitFor(() => expect(container.querySelector(".muncher-donut-chart-legend-item")).not.toBeNull());

            await userEvent.click(container.querySelectorAll(".muncher-donut-chart-legend-item")[0]);

            expect(middle(container)).toBe("Rent");
            expect(container.querySelector(".muncher-donut-chart-legend-item.is-selected")).not.toBeNull();
        });

        it("keeps the pick to this chart: another chart of the same data is not affected, and nothing is stored", async () => {
            getVisualization.mockResolvedValue(donut());
            const {container} = render(withClient(<><VisualizationEmbed data-viz-nid="vz/vzab"/><VisualizationEmbed data-viz-nid="vz/vzab"/></>));
            await waitFor(() => expect(container.querySelectorAll(".muncher-donut-slice")).toHaveLength(4));
            const setItem = vi.spyOn(Storage.prototype, "setItem");

            await userEvent.click(container.querySelectorAll(".muncher-donut-slice")[0]);

            const labels = [...container.querySelectorAll(".muncher-donut-chart-center-label")].map(e => e.textContent);
            expect(labels[0]).toBe("Rent");
            expect(labels[1]).not.toBe("Rent");
            expect(setItem).not.toHaveBeenCalled();
            setItem.mockRestore();
        });
    });

    describe("picking a part of a pie", () => {
        const pie = () => stored({
            kind: "pie",
            data: {
                shape: "dataset.v1",
                tables: {main: {columns: [{name: "part", role: "category"}, {name: "MB", role: "measure", unit: "count"}], rows: [{part: "Rent", MB: 60}, {part: "Food", MB: 40}]}},
            },
        });

        it("marks the slice a reader clicks, and the same part in the legend, and clears it when clicked again", async () => {
            getVisualization.mockResolvedValue(pie());
            const {container} = render(withClient(<VisualizationEmbed data-viz-nid="vz/vzab"/>));
            await waitFor(() => expect(container.querySelectorAll(".svg-pie-chart path")).toHaveLength(2));

            await userEvent.click(container.querySelectorAll(".svg-pie-chart path")[1]);
            await waitFor(() => expect(container.querySelectorAll(".svg-pie-chart path")[1].classList.contains("selected")).toBe(true));
            expect(container.querySelectorAll(".svg-pie-chart path")[0].classList.contains("selected")).toBe(false);
            expect(container.querySelectorAll(".legend-text--selected")).toHaveLength(1);
            expect(container.querySelector(".legend-text--selected")?.textContent).toContain("Food");

            await userEvent.click(container.querySelectorAll(".svg-pie-chart path")[1]);
            await waitFor(() => expect(container.querySelectorAll(".legend-text--selected")).toHaveLength(0));
        });

        it("picks the part from its legend entry, by its swatch or its words", async () => {
            getVisualization.mockResolvedValue(pie());
            const {container} = render(withClient(<VisualizationEmbed data-viz-nid="vz/vzab"/>));
            await waitFor(() => expect(container.querySelectorAll(".legend-text")).toHaveLength(2));

            await userEvent.click(container.querySelectorAll(".legend-text")[0]);
            await waitFor(() => expect(container.querySelector(".legend-text--selected")?.textContent).toContain("Rent"));

            await userEvent.click(container.querySelectorAll(".legend-rect")[1]);
            await waitFor(() => expect(container.querySelector(".legend-text--selected")?.textContent).toContain("Food"));
            expect(container.querySelectorAll(".legend-text--selected")).toHaveLength(1);
        });
    });
});
