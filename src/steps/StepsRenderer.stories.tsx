import type {Meta, StoryObj} from '@storybook/react';
import {StepsRenderer} from "./StepsRenderer.tsx";
import {RenderedNoteContent} from "../note/RenderedNoteContent.tsx";

const meta: Meta<typeof StepsRenderer> = {
    component: StepsRenderer,
    title: 'Content/StepsRenderer',
};

export default meta;
type Story = StoryObj<typeof StepsRenderer>;

export const Checklist: Story = {
    render: () => (
        <StepsRenderer data-steps={JSON.stringify([
            "Marinate the chicken in yogurt, half the garam masala, cumin, and turmeric",
            "Sear the chicken in a hot pan until browned but not fully cooked through",
            "In the same pan, melt the butter and sauté the onion until soft",
            "Stir in the remaining spices, then the crushed tomatoes. Simmer 10 minutes",
            "Return the chicken to the pan, add the cream, and simmer until cooked through",
            "Finish with cilantro and serve over rice",
        ])}/>
    ),
};

export const Numbered: Story = {
    render: () => (
        <StepsRenderer
            data-steps-ordered="true"
            data-steps={JSON.stringify([
                "Marinate the chicken in yogurt, half the garam masala, cumin, and turmeric",
                "Sear the chicken in a hot pan until browned but not fully cooked through",
                "In the same pan, melt the butter and sauté the onion until soft",
                "Stir in the remaining spices, then the crushed tomatoes. Simmer 10 minutes",
                "Return the chicken to the pan, add the cream, and simmer until cooked through",
                "Finish with cilantro and serve over rice",
            ])}/>
    ),
};

export const Nested: Story = {
    render: () => (
        <StepsRenderer
            data-steps-ordered="true"
            data-steps={JSON.stringify([
                {text: "Understand the ticket/goal and where this change fits architecturally."},
                {
                    text: "Confirm requirements are met and no existing functionality is broken.",
                    children: {
                        ordered: false,
                        items: [
                            {text: "Manually exercise the golden path"},
                            {text: "Check at least one edge case per changed function"},
                        ],
                    },
                },
                {text: "Verify validations, null checks, and edge cases are handled."},
            ])}/>
    ),
};

// Proves the actual bug fix: renders the SAME xhtml a note's captureXhtml would
// produce (a plain static <div data-steps="..."> wrapping a <ul>, no React
// attached, exactly what gets stored as renderedContent) through
// RenderedNoteContent, the same component foodopean-ui/tithi-ui/the read view
// all use. Before the fix, this marker lived directly on the <ul> instead of a
// wrapping <div> -- hydrating it nested a live <ul> inside the static <ul> it
// was replacing, which is invalid HTML (a <ul> can only contain <li> directly)
// and would compound one layer deeper on every hydration pass. Now it hydrates
// into a single, valid, fully live StepsRenderer.
export const Hydrated: Story = {
    render: () => (
        <RenderedNoteContent xhtml={
            '<article><p>Some ordinary note prose leads into the checklist below.</p>'
            + '<div data-steps=\''
            + JSON.stringify(["Marinate the chicken", "Sear the chicken", "Simmer the sauce"]).replace(/'/g, "&#39;")
            + '\'><ul class="muncher-steps"><li class="muncher-steps-item">unhydrated placeholder</li></ul></div></article>'
        }/>
    ),
};
