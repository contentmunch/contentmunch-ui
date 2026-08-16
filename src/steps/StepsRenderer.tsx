import React, {useState} from "react";
import "./assets/steps.css";

export interface StepsRendererProps extends React.ComponentProps<"ul"> {
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
// items, nothing is persisted, so reloading resets every box. Shared across
// every consumer of RenderedNoteContent (contentmunch-notes-ui's own live
// preview, plus foodopean-ui/tithi-ui rendering a note's static xhtml) --
// see defaultInteractiveRegions in RenderedNoteContent.tsx, which hydrates
// any `[data-steps]` marker in server-rendered content with this component,
// same mechanism as poll/form.
export const StepsRenderer: React.FC<StepsRendererProps> = (props) => {
    const raw = props["data-steps"];
    const ordered = props["data-steps-ordered"] === "true";
    const [checked, setChecked] = useState<Set<string>>(new Set());

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
            return next;
        });
    };

    // data-steps (and data-steps-ordered) are re-declared on the actual output
    // element -- not just read from props -- because this is what MarkdownEditor's
    // XHTML capture serializes into the note's stored renderedContent. Without them
    // on the real output element, the captured static HTML carries no [data-steps]
    // marker at all, so RenderedNoteContent's hydration (every OTHER consumer: the
    // read view, foodopean-ui, tithi-ui) never finds this block to bring back to
    // life -- it stays frozen exactly as it looked at save time, checkbox clicks
    // doing nothing since nothing is listening. Only the outermost list gets these
    // attributes; a nested sub-list isn't its own independent hydration target.
    const renderList = (
        list: StepNode[],
        listOrdered: boolean,
        path: string,
        rootAttrs?: {"data-steps"?: string; "data-steps-ordered"?: string}
    ) => {
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

        return listOrdered
            ? <ol className={className} {...rootAttrs}>{rows}</ol>
            : <ul className={className} {...rootAttrs}>{rows}</ul>;
    };

    if (items.length === 0) return null;

    return renderList(items, ordered, "", {
        "data-steps": raw,
        "data-steps-ordered": ordered ? "true" : undefined,
    });
};

export const StepsDirectiveError: React.FC<React.ComponentProps<"span">> = () => (
    <span className="external-link-error">Invalid :::steps directive -- needs a list of steps, e.g. "1. do the thing"</span>
);
