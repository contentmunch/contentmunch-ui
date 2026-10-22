import type {Column, Row} from "./dataset/Dataset.ts";

/** A visualization as a notes backend stores it: its words, the kind that draws it, and the dataset container. */
export interface StoredVisualization {
    kind: string;
    title: string;
    caption?: string | null;
    summary: string;
    data: { shape: "dataset.v1"; tables: { main: { columns: Column[]; rows: Row[] } } };
    options?: { period?: string };
}

/**
 * The one call a visualization embed needs, deliberately unaware of auth, base URL or transport: each app gives its own
 * (an authenticated session, or a headless public site's proxy) through NoteWidgetClientProvider, as it does for polls and forms.
 */
export interface VisualizationWidgetClient {
    getVisualization(bucket: string, id: string): Promise<StoredVisualization>;
}
