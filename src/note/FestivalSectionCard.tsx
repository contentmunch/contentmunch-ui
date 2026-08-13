import * as React from "react";
import {RenderedNoteContent} from "./RenderedNoteContent.tsx";
import "./assets/festival-section-card.css";

export type FestivalSection = "MAIN" | "LEARNING" | "RITUAL";

export interface FestivalSectionCardNote {
    title: string;
    renderedContent: string;
}

export interface FestivalSectionCardData {
    section: FestivalSection;
    sequenceOrder: number;
}

export interface FestivalSectionCardProps {
    note: FestivalSectionCardNote;
    section: FestivalSectionCardData;
    /** Show the "Festival" / "Festival learning" / "Ritual & observance" eyebrow label. A
     * standalone note view (contentmunch-notes-ui's NotePage, with no other festival context
     * on screen) needs it; a consumer that already labels the section elsewhere (e.g. an expand
     * button above a whole list of cards) passes false to avoid repeating it on every card.
     * Defaults to true. */
    showEyebrow?: boolean;
    /** Show the note's own title. A consumer whose surrounding context already identifies the
     * note (e.g. a page hero showing the same name) passes false to avoid repeating it.
     * Defaults to true. */
    showTitle?: boolean;
}

const SECTION_LABEL: Record<FestivalSection, string> = {
    MAIN: "Festival",
    LEARNING: "Festival learning",
    RITUAL: "Ritual & observance",
};

// Read-only view of a single festival content note (one MAIN/LEARNING/RITUAL
// card), shared by contentmunch-notes-ui (previewing/authoring) and
// contentmunch-tithi-ui (the actual festival calendar page). Deliberately
// thin -- unlike RecipeCard, a festival note carries no structured fields of
// its own (festivalKey/section/sequenceOrder are pure grouping metadata, not
// content), so there's nothing to lay out beyond the note's own body. It
// renders through RenderedNoteContent rather than a second
// dangerouslySetInnerHTML, so mermaid diagrams, YouTube embeds, images, and
// live Poll/Form widgets look exactly as they do everywhere else a note is
// viewed -- the whole point of pulling festival content out of hardcoded
// strings and into notes in the first place. Deliberately carries no
// site-specific look of its own beyond this base style -- a consumer that
// wants its own visual treatment (card boxing, spacing, fonts, table/list
// styling) does that in its own stylesheet against these class names,
// rather than baking one app's design into this shared component.
export const FestivalSectionCard: React.FC<FestivalSectionCardProps> = (
    {note, section, showEyebrow = true, showTitle = true}
) => (
    <div className="muncher-festival-section-card">
        {showEyebrow && <div className="muncher-festival-section-eyebrow">{SECTION_LABEL[section.section]}</div>}
        {showTitle && <h3 className="muncher-festival-section-title">{note.title}</h3>}
        <RenderedNoteContent xhtml={note.renderedContent} className="muncher-festival-section-body"/>
    </div>
);

export default FestivalSectionCard;
