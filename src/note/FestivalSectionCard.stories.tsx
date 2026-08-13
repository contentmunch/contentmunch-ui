import type {Meta, StoryObj} from '@storybook/react';
import {FestivalSectionCard, type FestivalSectionCardNote} from "./FestivalSectionCard.tsx";

// Shaped after what PublicFestivalSectionResponse (contentmunch-notes-api)
// hands tithi-api, which forwards it through to tithi-ui unchanged.
const mainNote: FestivalSectionCardNote = {
    title: "Janai Purnima / Kwati Punhi",
    renderedContent: `<article xmlns="http://www.w3.org/1999/xhtml"><p>Rooted in the Puranic legend of the churning of the ocean (Samudra Manthan). Lord Shiva drank the lethal Halahala poison to save creation, generating immense internal heat. He rushed to the pristine high-altitude Gosainkunda Lake in Nepal, striking his trident to release cold, pure glacier water to soothe his throat.</p>
<h2 id="newar-community">Newar Community</h2>
<p>Calls this day 'Kwati Punhi', keeping the entire focus anchored on the culinary execution of nine sprouted beans and family unity.</p></article>`,
};

const learningNote: FestivalSectionCardNote = {
    title: "Why Janai Purnima commands you to consciously reset your protective and moral boundaries",
    renderedContent: `<article xmlns="http://www.w3.org/1999/xhtml"><p>Janai Purnima occurs at the absolute peak of the humid monsoon cycle, a time when the external environment is unstable and prone to waterborne illnesses.</p></article>`,
};

const meta: Meta<typeof FestivalSectionCard> = {
    component: FestivalSectionCard,
    title: 'Content/FestivalSectionCard',
};

export default meta;
type Story = StoryObj<typeof FestivalSectionCard>;

export const Main: Story = {
    args: {note: mainNote, section: {section: "MAIN", sequenceOrder: 0}},
};

export const LearningCard: Story = {
    args: {note: learningNote, section: {section: "LEARNING", sequenceOrder: 1}},
};

// How tithi-ui's "Festival learning" section lays out several cards at once
// -- each note gets its own card, ordered by sequenceOrder.
export const LearningTrack: StoryObj = {
    render: () => (
        <div style={{display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "40rem"}}>
            <FestivalSectionCard note={learningNote} section={{section: "LEARNING", sequenceOrder: 0}}/>
            <FestivalSectionCard
                note={{title: "The Gunla Axis: Cleansing the collective consciousness through rhythmic sound", renderedContent: "<article><p>For the Newar Buddhist community, Janai Purnima is a major milestone within the holy month of Gunla.</p></article>"}}
                section={{section: "LEARNING", sequenceOrder: 1}}/>
        </div>
    ),
};
