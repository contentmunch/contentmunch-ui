import {StrictMode} from "react";
import {beforeEach, describe, expect, it, vi} from "vitest";
import {render, screen, waitFor} from "@testing-library/react";
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
});
