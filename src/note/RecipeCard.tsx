import * as React from "react";
import {useMemo, useState} from "react";
import {Icon} from "../icon/Icon.tsx";
import "./assets/recipe-card.css";

export interface RecipeCardNote {
    title: string;
    renderedContent: string;
}

export interface RecipeCardIngredient {
    name: string;
    amount?: number | null;
    unit?: string | null;
}

export interface RecipeCardInstruction {
    text: string;
}

export interface RecipeCardData {
    servings: number;
    prepMinutes?: number | null;
    cookMinutes?: number | null;
    ingredients: RecipeCardIngredient[];
    instructions: RecipeCardInstruction[];
}

export interface RecipeCardProps {
    note: RecipeCardNote;
    recipe: RecipeCardData;
}

interface HeroPhoto {
    photoUrl: string | null;
    photoAlt: string | null;
    bodyHtml: string;
}

const HERO_SELECTOR = '[data-media-image-role="hero"]';

// The recipe hero photo is a normal `:image{nid="..." role="hero"}`
// directive at the top of the note body -- the `role="hero"` marker (set by
// remarkImageDirective.ts, read by ImageRenderer.tsx in contentmunch-notes-ui)
// is what identifies it, not position: position alone can't tell "the photo
// deliberately attached via the Photo picker" apart from "a photo the author
// just happened to type first in their Tips & Notes". Split out of the
// already-rendered HTML (never re-derived from raw Markdown, so there's only
// one source of truth for how a directive resolves) and removed from the
// body -- its own leading paragraph -- so it isn't shown twice.
const splitHeroPhoto = (renderedContent: string): HeroPhoto => {
    if (!renderedContent || typeof DOMParser === "undefined") {
        return {photoUrl: null, photoAlt: null, bodyHtml: renderedContent};
    }

    const doc = new DOMParser().parseFromString(renderedContent, "text/html");
    const heroWrap = doc.querySelector(HERO_SELECTOR);
    const heroImg = heroWrap?.querySelector("img");
    if (!heroWrap || !heroImg) {
        return {photoUrl: null, photoAlt: null, bodyHtml: renderedContent};
    }

    const photoUrl = heroImg.getAttribute("src");
    const photoAlt = heroImg.getAttribute("alt");
    (heroWrap.closest("p") ?? heroWrap).remove();

    const root = doc.body.firstElementChild;
    return {photoUrl, photoAlt, bodyHtml: root ? root.outerHTML : doc.body.innerHTML};
};

const totalMinutes = (recipe: RecipeCardData): number | null => {
    if (recipe.prepMinutes == null && recipe.cookMinutes == null) return null;
    return (recipe.prepMinutes ?? 0) + (recipe.cookMinutes ?? 0);
};

const formatDuration = (recipe: RecipeCardData): string | null => {
    const total = totalMinutes(recipe);
    if (total == null || total === 0) return null;
    if (total < 60) return `${total}m`;
    const hours = Math.floor(total / 60);
    const minutes = total % 60;
    return minutes ? `${hours}h ${minutes}m` : `${hours}h`;
};

const toggle = (set: Set<number>, index: number): Set<number> => {
    const next = new Set(set);
    if (next.has(index)) {
        next.delete(index);
    } else {
        next.add(index);
    }
    return next;
};

interface CrossableItemProps {
    done: boolean;
    onToggle: () => void;
    className: string;
    children: React.ReactNode;
}

// A click-to-cross-off list row -- ingredients get crossed off as they go in
// the bowl, steps as they're finished, while actually cooking from the card.
// Local UI state only, nothing persisted: reload the page and it resets.
const CrossableItem: React.FC<CrossableItemProps> = ({done, onToggle, className, children}) => (
    <li
        className={`${className}${done ? " muncher-recipe-item--done" : ""}`}
        role="checkbox"
        aria-checked={done}
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onToggle();
            }
        }}
    >
        <span className="muncher-recipe-item-marker">
            <Icon name={done ? "circle-check" : "circle"} size="small"/>
        </span>
        {children}
    </li>
);

// Read-only recipe view (hero photo, vitals row, numbered method,
// ingredients panel, and the note's own rich-text content), shared by
// contentmunch-notes-ui's note aside and contentmunch-foodopean-ui's recipe
// page. Method/ingredients lay out side-by-side once the card itself has
// room (a container query, not a viewport one, since the same markup
// renders both full-width and inside a narrow sidebar). Ingredients and
// steps can be clicked/tapped to cross them off while cooking.
export const RecipeCard: React.FC<RecipeCardProps> = ({note, recipe}) => {
    const duration = formatDuration(recipe);
    const [doneIngredients, setDoneIngredients] = useState<Set<number>>(new Set());
    const [doneSteps, setDoneSteps] = useState<Set<number>>(new Set());

    const {photoUrl, photoAlt, bodyHtml} = useMemo(
        () => splitHeroPhoto(note.renderedContent),
        [note.renderedContent],
    );

    return (
        <div className="muncher-recipe-card">
            {photoUrl && (
                <img
                    className="muncher-recipe-photo"
                    src={photoUrl}
                    alt={photoAlt || note.title}
                />
            )}

            <div className="muncher-recipe-vitals">
                <div>
                    <div className="muncher-recipe-vital-label">Servings</div>
                    <div className="muncher-recipe-vital-value">{recipe.servings}</div>
                </div>
                {recipe.prepMinutes != null && (
                    <div>
                        <div className="muncher-recipe-vital-label">Prep</div>
                        <div className="muncher-recipe-vital-value">{recipe.prepMinutes} min</div>
                    </div>
                )}
                {recipe.cookMinutes != null && (
                    <div>
                        <div className="muncher-recipe-vital-label">Cook</div>
                        <div className="muncher-recipe-vital-value">{recipe.cookMinutes} min</div>
                    </div>
                )}
                {duration && (
                    <div>
                        <div className="muncher-recipe-vital-label">Total</div>
                        <div className="muncher-recipe-vital-value">{duration}</div>
                    </div>
                )}
            </div>

            <div className="muncher-recipe-body">
                <div className="muncher-recipe-method">
                    <h3 className="muncher-recipe-heading">Method</h3>
                    <ol className="muncher-recipe-steps">
                        {recipe.instructions.map((step, index) => (
                            <CrossableItem
                                key={index}
                                className="muncher-recipe-step"
                                done={doneSteps.has(index)}
                                onToggle={() => setDoneSteps(prev => toggle(prev, index))}
                            >
                                <span className="muncher-recipe-step-num">{index + 1}</span>
                                <span className="muncher-recipe-step-content">
                                    <p>{step.text}</p>
                                </span>
                            </CrossableItem>
                        ))}
                    </ol>
                </div>

                <div className="muncher-recipe-ingredients-panel">
                    <h3 className="muncher-recipe-heading">Ingredients</h3>
                    <ul className="muncher-recipe-ingredients">
                        {recipe.ingredients.map((ingredient, index) => (
                            <CrossableItem
                                key={index}
                                className="muncher-recipe-ingredient"
                                done={doneIngredients.has(index)}
                                onToggle={() => setDoneIngredients(prev => toggle(prev, index))}
                            >
                                <span>{[ingredient.amount, ingredient.unit, ingredient.name].filter(Boolean).join(" ")}</span>
                            </CrossableItem>
                        ))}
                    </ul>
                </div>
            </div>

            {bodyHtml && (
                // The note's own rich text -- free-form description, any
                // "## Notes" section, and any inline images (the hero photo
                // already split out above). Rendered wholesale rather than
                // picked apart, since it's arbitrary author content; we only
                // lay out spacing/typography around it, the embedded image's
                // own chrome (.media-image-wrap etc.) belongs to the shared
                // media component elsewhere in the app.
                //
                // Assumes renderedContent is sanitized server-side before
                // reaching this component.
                <div
                    className="muncher-recipe-notes"
                    dangerouslySetInnerHTML={{__html: bodyHtml}}
                />
            )}
        </div>
    );
};

export default RecipeCard;
