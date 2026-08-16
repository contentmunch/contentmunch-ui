import React, {useState} from "react";
import "./assets/steps.css";

export interface StepsRendererProps extends React.ComponentProps<"ul"> {
    "data-steps"?: string;
    /** Set when the authored list was ordered (`1. `, `2. `, ...) -- keeps the
     * numbering visible instead of collapsing to an undifferentiated bullet. */
    "data-steps-ordered"?: string;
}

// Plain checkbox + strikethrough -- deliberately undecorated (no marker
// icons) so a checklist reads as part of the note's prose instead of
// standing out like RecipeCard's Method list. Numbering is opt-in: it
// mirrors whatever the author actually wrote (an ordered `1. ` list keeps
// its numbers, an unordered `- ` list stays unnumbered) rather than being a
// separate directive flag. Checked state is local UI state only, same as
// RecipeCard's crossable items: nothing is persisted, so reloading resets
// every box. Shared across every consumer of RenderedNoteContent
// (contentmunch-notes-ui's own live preview, plus foodopean-ui/tithi-ui
// rendering a note's static xhtml) -- see defaultInteractiveRegions in
// RenderedNoteContent.tsx, which hydrates any `[data-steps]` marker in
// server-rendered content with this component, same mechanism as poll/form.
export const StepsRenderer: React.FC<StepsRendererProps> = (props) => {
    const raw = props["data-steps"];
    const ordered = props["data-steps-ordered"] === "true";
    const [checked, setChecked] = useState<Set<number>>(new Set());

    let steps: string[] = [];
    try {
        steps = raw ? JSON.parse(raw) : [];
    } catch {
        steps = [];
    }

    const toggle = (index: number) => {
        setChecked((prev) => {
            const next = new Set(prev);
            if (next.has(index)) next.delete(index); else next.add(index);
            return next;
        });
    };

    const items = steps.map((text, index) => {
        const done = checked.has(index);
        return (
            <li key={index} className="muncher-steps-item">
                <label>
                    {ordered && <span className="muncher-steps-number">{index + 1}.</span>}
                    <input type="checkbox" checked={done} onChange={() => toggle(index)}/>
                    <span className={done ? "muncher-steps-item--done" : undefined}>{text}</span>
                </label>
            </li>
        );
    });

    return ordered
        ? <ol className="muncher-steps muncher-steps--numbered">{items}</ol>
        : <ul className="muncher-steps">{items}</ul>;
};

export const StepsDirectiveError: React.FC<React.ComponentProps<"span">> = () => (
    <span className="external-link-error">Invalid :::steps directive -- needs a list of steps, e.g. "1. do the thing"</span>
);
