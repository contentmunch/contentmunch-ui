import * as React from "react";
import {useEffect, useState} from "react";
import {useVisualizationWidgetClient} from "../note/NoteWidgetClientProvider.tsx";
import {Visualization} from "./Visualization.tsx";
import type {Dataset, VisualizationSize} from "./dataset/Dataset.ts";
import {KIND_LABELS, KINDS} from "./registry.ts";
import {validateFor} from "./dataset/validate.ts";
import type {Kind} from "./dataset/validate.ts";
import type {StoredVisualization} from "./VisualizationWidgetClient.ts";
import "./assets/visualization-embed.css";

export interface VisualizationEmbedProps extends React.ComponentProps<"div"> {
    "data-viz-nid"?: string;
    "data-viz-size"?: string;
    "data-viz-static"?: string;
    "data-viz-text"?: string;
    /** `false` leaves the legend out of this use; a visualization has one otherwise. */
    "data-viz-legend"?: string;
    /** How this use draws the data when it is not the visualization's own kind (a table beside its bar chart): the numbers stay one. */
    "data-viz-kind"?: string;
}

const cache = new Map<string, Promise<StoredVisualization>>();

const fetchVisualization = (nid: string, get: (bucket: string, id: string) => Promise<StoredVisualization>): Promise<StoredVisualization> => {
    let pending = cache.get(nid);
    if (!pending) {
        const [bucket, id] = nid.split("/");
        pending = !bucket || !id ? Promise.reject(new Error(`invalid viz nid "${nid}" - expected "bucket/nid"`)) : get(bucket, id);
        pending.catch(() => cache.delete(nid));
        cache.set(nid, pending);
    }
    return pending;
};

/** Drops what was fetched for an address (or for every address) so the next view reads the stored copy again, e.g. after an edit. */
export const forgetVisualization = (nid?: string): void => {
    if (nid) cache.delete(nid);
    else cache.clear();
};

export const datasetOf = (v: Pick<StoredVisualization, "title" | "summary" | "data">): Dataset => ({
    title: v.title,
    summary: v.summary,
    columns: v.data.tables.main.columns,
    rows: v.data.tables.main.rows,
});

/**
 * A visualization in a note, drawn live from what is stored: the numbers, the kind and the period are the visualization's own, so a
 * change to them changes every note that shows it. The caption is its own too, unless this use sets `text`. Whether the legend shows
 * is a choice of the use (`legend="false"`), since the same chart may sit beside a table in one note and alone in another. So is the kind
 * (`kind="table"`): one dataset, shown as a chart in one place and as its table in another, both reading the same numbers.
 */
export const VisualizationEmbed: React.FC<VisualizationEmbedProps> = (props) => {
    const nid = props["data-viz-nid"];
    const isStatic = props["data-viz-static"] === "true";
    const staticText = props["data-viz-text"];
    const size: VisualizationSize = props["data-viz-size"] === "small" || props["data-viz-size"] === "large" ? props["data-viz-size"] : "medium";
    const {getVisualization} = useVisualizationWidgetClient();

    const [stored, setStored] = useState<StoredVisualization | null>(null);
    const [error, setError] = useState<string | null>(null);
    // The part of a pie or donut a reader clicked. It lives only in this page, for as long as the chart is on it: nothing is stored or sent.
    const [selected, setSelected] = useState<string | null>(null);

    useEffect(() => {
        if (!nid) return;
        let cancelled = false;
        setStored(null);
        setError(null);
        setSelected(null);
        fetchVisualization(nid, getVisualization)
            .then((found) => !cancelled && setStored(found))
            .catch(() => !cancelled && setError(`Could not find the visualization "${nid}"`));
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nid]);

    if (!nid) return <span className="viz-embed-error">::viz is missing a required nid attribute</span>;
    if (error) return <span className="viz-embed-error">{error}</span>;
    if (!stored) return <div data-viz-nid={nid} className="viz-embed viz-embed--loading">&hellip;</div>;
    if (!KINDS.includes(stored.kind as Kind)) {
        return <span className="viz-embed-error">&quot;{nid}&quot; is a kind of visualization this page does not know ({stored.kind})</span>;
    }

    const asked = props["data-viz-kind"]?.trim().toLowerCase() || undefined;
    const data = datasetOf(stored);
    if (asked) {
        if (!KINDS.includes(asked as Kind)) {
            return <span className="viz-embed-error">&quot;{nid}&quot; is shown as &quot;{asked}&quot;, a kind this page does not know</span>;
        }
        const problems = validateFor(asked as Kind, data);
        if (problems.length > 0) {
            return <span className="viz-embed-error">&quot;{nid}&quot; cannot be shown as a {KIND_LABELS[asked as Kind].toLowerCase()}: {problems[0]}</span>;
        }
    }
    const kind = (asked ?? stored.kind) as Kind;
    const caption = isStatic ? staticText : stored.caption;
    const legend = props["data-viz-legend"] !== "false";
    return (
        <div data-viz-nid={nid} data-viz-static={isStatic ? "true" : undefined} data-viz-size={size} data-viz-legend={legend ? undefined : "false"} data-viz-kind={asked} className={`viz-embed viz-embed--${size}`}>
            <Visualization kind={kind} data={data} size={size} legend={legend} period={stored.options?.period ?? null}
                           selected={selected} onSelect={setSelected}/>
            {caption && <p className="viz-embed-caption"><span data-link-text>{caption}</span></p>}
        </div>
    );
};

export const VisualizationDirectiveError: React.FC<React.ComponentProps<"span">> = () => (
    <span className="viz-embed-error">Invalid ::viz directive</span>
);
