import type {Meta, StoryObj} from '@storybook/react';
import {RecipeCard, type RecipeCardData, type RecipeCardNote} from "./RecipeCard.tsx";
import "./assets/recipe-card-stories.css";
import heroPhoto from "./assets/story-images/hero-placeholder.jpg";
import notesPhoto from "./assets/story-images/notes-placeholder.jpg";

// Shaped after a real note + supplement pair returned by the notes API.
// note.renderedContent is the already-rendered XHTML for the note body:
// - The hero photo is a real `:image{nid="..." role="hero"}` directive,
//   which resolves to its own leading <p><span data-media-image-role="hero"
//   ...>...</span></p> -- RecipeCard finds it by that attribute (not
//   position) and splits it out of the body so it isn't shown twice.
// - The inline Tips & Notes photo is a plain `:image{nid="..."}` directive
//   (no role), resolved the same way but left in place in the body.
// Rendered wholesale via dangerouslySetInnerHTML, same as
// RenderedNoteContent elsewhere in the app. Real photos here (rather than
// `/api/media/...` src's, which 404 with no backend behind Storybook) so the
// layout can actually be eyeballed -- swapping in real URLs is the only
// deviation from the true rendered-HTML shape.
const sampleNote: RecipeCardNote = {
    title: "Chicken Tikka Masala",
    renderedContent: `<article xmlns="http://www.w3.org/1999/xhtml"><p><span data-media-image-src="ip/ipwb" class="media-image-wrap media-image-wrap--medium" data-media-image-size="medium" data-media-image-role="hero"><img alt="Chicken Tikka Masala" class="media-image" src="${heroPhoto}" /></span></p>
<p>A weeknight favorite — rich, warmly spiced, and forgiving if you don't have every spice exactly measured. Great with basmati rice or naan.
<span data-media-image-src="pk/pkay" class="media-image-wrap media-image-wrap--medium" data-media-image-size="medium"><img alt="Chicken Tikka Masala with basmati rice" class="media-image" src="${notesPhoto}" /><span class="media-image-caption"><span class="muncher-icon"><svg class="muncher-icon--small" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></span><span data-link-text="true">Chicken tikka masala with basmati rice</span></span></span></p>
<h2 id="notes">Notes</h2>
<ul>
<li>Marinating overnight makes a real difference in flavor.</li>
<li>Swap heavy cream for coconut milk for a dairy-free version.</li>
</ul></article>`
};

const sampleRecipe: RecipeCardData = {
    servings: 4,
    prepMinutes: 20,
    cookMinutes: 35,
    ingredients: [
        {name: "boneless chicken thighs", amount: 1.5, unit: "fl oz"},
        {name: "plain yogurt", amount: 0.5, unit: "cup"},
        {name: "garam masala", amount: 2, unit: "tsp"},
        {name: "ground cumin", amount: 1, unit: "tsp"},
        {name: "garlic, minced", amount: 3, unit: "clove"},
        {name: "ginger, grated", amount: 1, unit: "tsp"},
        {name: "butter", amount: 3, unit: "tsp"},
        {name: "onion, diced", amount: 1, unit: "whole"},
        {name: "crushed tomatoes", amount: 1, unit: "can"},
        {name: "heavy cream", amount: 0.5, unit: "cup"},
        {name: "cilantro, chopped", amount: 2, unit: "tsp"},
    ],
    instructions: [
        {text: "Marinate the chicken in yogurt, half the garam masala, cumin, and turmeric for at least 20 minutes (overnight is better)"},
        {text: "Sear the chicken in a hot pan until browned but not fully cooked through; set aside"},
        {text: "In the same pan, melt the butter and sauté the onion until soft, then add garlic and ginger for 1 minute"},
        {text: "Stir in the remaining spices, then the crushed tomatoes. Simmer 10 minutes"},
        {text: "Return the chicken to the pan, add the cream, and simmer until the chicken is cooked through and the sauce thickens"},
        {text: "Finish with cilantro and serve over rice"},
    ],
};

const meta: Meta<typeof RecipeCard> = {
    component: RecipeCard,
    title: 'Content/RecipeCard',
};

export default meta;
type Story = StoryObj<typeof RecipeCard>;

export const Default: Story = {
    args: {note: sampleNote, recipe: sampleRecipe},
};

// Same markup, container-constrained -- exercises the container-query
// breakpoint that keeps method/ingredients stacked when the card sits in a
// narrow note aside rather than a full-width page.
export const NarrowSidebar: Story = {
    args: {note: sampleNote, recipe: sampleRecipe},
    decorators: [
        (Story) => (
            <div style={{maxWidth: "20rem"}}>
                <Story/>
            </div>
        ),
    ],
};

export const MinimalData: Story = {
    args: {
        note: {title: "Scrambled Eggs", renderedContent: ""},
        recipe: {
            servings: 2,
            ingredients: [{name: "eggs", amount: 2}],
            instructions: [{text: "Scramble the eggs."}],
        },
    },
};

// Full recipe note page, composed the way contentmunch-foodopean-ui's
// RecipePage lays it out today: title + category/effort pills above the
// card. The card renders its own Tips & Notes section from
// note.renderedContent, so nothing else needs to sit below it here. The
// title row is a page-level concern (category color, per-app typography) so
// it's plain markup rather than part of the shared component -- this story
// exists to preview RecipeCard in that real context, not to promote the
// whole page into contentmunch-ui.
export const FullRecipePage: StoryObj = {
    parameters: {layout: 'fullscreen'},
    render: () => (
        <div className="recipe-story-page">
            <div className="recipe-story-head">
                <h1>Chicken Tikka Masala</h1>
                <span className="recipe-story-pill recipe-story-pill--category">Indian Curry</span>
                <span className="recipe-story-pill recipe-story-pill--effort">Standard</span>
            </div>

            <RecipeCard note={sampleNote} recipe={sampleRecipe}/>
        </div>
    ),
};
