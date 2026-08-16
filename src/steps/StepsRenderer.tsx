import React, {useState} from "react";
import "./assets/steps.css";

export interface StepsRendererProps extends React.ComponentProps<"ul"> {
    "data-steps"?: string;
}

// Plain checkbox + strikethrough -- deliberately undecorated (no marker
// icons, no numbering) so a checklist reads as part of the note's prose
// instead of standing out like RecipeCard's Method list. Checked state is
// local UI state only, same as RecipeCard's crossable items: nothing here
// is persisted, so reloading resets every box. Shared across every consumer
// of RenderedNoteContent (contentmunch-notes-ui's own live preview, plus
// foodopean-ui/tithi-ui rendering a note's static xhtml) -- see
// defaultInteractiveRegions in RenderedNoteContent.tsx, which hydrates any
// `[data-steps]` marker in server-rendered content with this component,
// same mechanism as poll/form.
export const StepsRenderer: React.FC<StepsRendererProps> = (props) => {
    const raw = props["data-steps"];
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

    return (
        <ul className="muncher-steps">
            {steps.map((text, index) => {
                const done = checked.has(index);
                return (
                    <li key={index} className="muncher-steps-item">
                        <label>
                            <input type="checkbox" checked={done} onChange={() => toggle(index)}/>
                            <span className={done ? "muncher-steps-item--done" : undefined}>{text}</span>
                        </label>
                    </li>
                );
            })}
        </ul>
    );
};

export const StepsDirectiveError: React.FC<React.ComponentProps<"span">> = () => (
    <span className="external-link-error">Invalid :::steps directive -- needs a list of steps, e.g. "1. do the thing"</span>
);
