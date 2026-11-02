import React, {useState} from "react";
import "./assets/steps.css";

export interface StepsRendererProps extends React.ComponentProps<"div"> {
    "data-steps"?: string;
    /** Set when the authored list was ordered (`1. `, `2. `, ...) -- keeps the
     * numbering visible instead of collapsing to an undifferentiated bullet. */
    "data-steps-ordered"?: string;
}

interface StepNode {
    text: string;
    children?: {ordered: boolean; items: StepNode[]};
}

// Accepts either shape: a bare string (the original data-steps format -- still
// what's inside any renderedContent captured before nested steps existed) or an
// object with an optional nested `children` list. Both can appear in the same
// array once a note with old-format steps gets a new step appended to it.
const normalizeStep = (entry: unknown): StepNode | null => {
    if (typeof entry === "string") return {text: entry};
    if (entry && typeof entry === "object" && typeof (entry as StepNode).text === "string") {
        return entry as StepNode;
    }
    return null;
};

const normalizeItems = (raw: unknown): StepNode[] =>
    Array.isArray(raw) ? raw.map(normalizeStep).filter((step): step is StepNode => step !== null) : [];

// Plain checkbox + strikethrough -- deliberately undecorated (no marker
// icons) so a checklist reads as part of the note's prose instead of
// standing out like RecipeCard's Method list. Numbering is opt-in: it
// mirrors whatever the author actually wrote (an ordered `1. ` list keeps
// its numbers, an unordered `- ` list stays unnumbered) rather than being a
// separate directive flag. A step can nest its own sub-list of steps one
// (or more) levels deep, each with its own ordered/unordered state and its
// own numbering restarting from 1. Checked state is local UI state only,
// keyed by dotted path ("0", "0.1", "1.2.0", ...) so nested items never
// collide with siblings at other depths -- same as RecipeCard's crossable
// items. Ticks are remembered in this browser (see memoryKey), never saved to the note, so the list itself never needs to be rewritten.
// Shared across
// every consumer of RenderedNoteContent (contentmunch-notes-ui's own live
// preview, plus foodopean-ui/tithi-ui rendering a note's static xhtml) --
// see defaultInteractiveRegions in RenderedNoteContent.tsx, which hydrates
// any `[data-steps]` marker in server-rendered content with this component,
// same mechanism as poll/form.
// Ticks are remembered in this browser (localStorage), per page and per list: the key is the page's path plus a hash of the list's own
// content, so two lists on one page never share ticks and an edited list starts fresh rather than showing ticks against the wrong
// steps. Storage can be missing or full (private windows, blocked site data); then the ticks last until the page is closed, as before.
const hashOf = (text: string) => {
    let hash = 5381;
    for (let i = 0; i < text.length; i++) hash = ((hash << 5) + hash + text.charCodeAt(i)) | 0;
    return (hash >>> 0).toString(36);
};

const memoryKey = (raw: string | undefined) =>
    raw ? `muncher-steps:${window.location.pathname}:${hashOf(raw)}` : undefined;

const remembered = (key: string | undefined): Set<string> => {
    if (!key) return new Set();
    try {
        const stored = JSON.parse(window.localStorage.getItem(key) ?? "[]");
        return new Set(Array.isArray(stored) ? stored.filter((path): path is string => typeof path === "string") : []);
    } catch {
        return new Set();
    }
};

const remember = (key: string | undefined, checked: Set<string>) => {
    if (!key) return;
    try {
        if (checked.size === 0) window.localStorage.removeItem(key);
        else window.localStorage.setItem(key, JSON.stringify([...checked]));
    } catch {
        // nowhere to keep it: the ticks still work for this visit
    }
};

export const StepsRenderer: React.FC<StepsRendererProps> = (props) => {
    const raw = props["data-steps"];
    const ordered = props["data-steps-ordered"] === "true";
    const key = memoryKey(raw);
    const [checked, setChecked] = useState<Set<string>>(() => remembered(key));

    let items: StepNode[] = [];
    try {
        items = raw ? normalizeItems(JSON.parse(raw)) : [];
    } catch {
        items = [];
    }

    const toggle = (path: string) => {
        setChecked((prev) => {
            const next = new Set(prev);
            if (next.has(path)) next.delete(path); else next.add(path);
            remember(key, next);
            return next;
        });
    };

    const renderList = (list: StepNode[], listOrdered: boolean, path: string) => {
        const className = `muncher-steps${listOrdered ? " muncher-steps--numbered" : ""}`;
        const rows = list.map((step, index) => {
            const itemPath = `${path}${index}`;
            const done = checked.has(itemPath);
            return (
                <li key={itemPath} className="muncher-steps-item">
                    <label>
                        {listOrdered && <span className="muncher-steps-number">{index + 1}.</span>}
                        <input type="checkbox" checked={done} onChange={() => toggle(itemPath)}/>
                        <span className={done ? "muncher-steps-item--done" : undefined}>{step.text}</span>
                    </label>
                    {step.children && step.children.items.length > 0 &&
                        renderList(step.children.items, step.children.ordered, `${itemPath}.`)}
                </li>
            );
        });

        return listOrdered ? <ol className={className}>{rows}</ol> : <ul className={className}>{rows}</ul>;
    };

    if (items.length === 0) return null;

    // data-steps (and data-steps-ordered) are re-declared here, on a wrapping <div>
    // -- not just read from props, and deliberately NOT on the <ul>/<ol> itself --
    // because this is what MarkdownEditor's XHTML capture serializes into the
    // note's stored renderedContent. Without the marker on the real output,
    // RenderedNoteContent's hydration (every OTHER consumer: the read view,
    // foodopean-ui, tithi-ui) never finds this block to bring back to life -- it
    // stays frozen exactly as it looked at save time, checkbox clicks doing
    // nothing since nothing is listening. A <div> wrapper, not the list element
    // itself, is what makes that safe to re-hydrate: hydrating an already-rendered
    // block nests a fresh copy of this component's own output inside the static
    // markup it's replacing (same as Poll/Form's own root re-declaring
    // data-poll-nid/data-form-nid) -- div-in-div is harmless, but <ul> containing
    // a bare <ul> (no wrapping <li>) is invalid HTML and would compound one layer
    // deeper on every hydration pass.
    return (
        <div data-steps={raw} data-steps-ordered={ordered ? "true" : undefined}>
            {renderList(items, ordered, "")}
        </div>
    );
};

export const StepsDirectiveError: React.FC<React.ComponentProps<"span">> = () => (
    <span className="external-link-error">Invalid :::steps directive -- needs a list of steps, e.g. "1. do the thing"</span>
);
