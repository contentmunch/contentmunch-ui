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
     * on screen) needs it; tithi-ui's festival calendar page already shows the same label once,
     * on the expand button above a whole list of cards, so it passes false there to avoid
     * repeating it on every card in that list. Defaults to true. */
    showEyebrow?: boolean;
    /** Show the note's own title. Meaningful for LEARNING cards, where several notes with
     * distinct topics sit side by side and need their own headline. For MAIN and RITUAL --
     * typically a single note -- the surrounding page (tithi-ui's festival hero, or this
     * component's own eyebrow) already gives enough context, so repeating the note's title
     * would just be noise. Defaults to true. */
    showTitle?: boolean;
}

const SECTION_LABEL: Record<FestivalSection, string> = {
    MAIN: "Festival",
    LEARNING: "Festival learning",
    RITUAL: "Ritual & observance",
};

// A LEARNING card sits in a list of several distinct-topic notes and needs
// its own visual boundary (the pre-redesign festival page always gave these
// their own soft card); a MAIN or RITUAL note is normally alone in its
// section, so it reads better flowing directly against the surrounding page
// rather than boxed.
const isBoxed = (section: FestivalSection): boolean => section === "LEARNING";

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
// strings and into notes in the first place.
export const FestivalSectionCard: React.FC<FestivalSectionCardProps> = (
    {note, section, showEyebrow = true, showTitle = true}
) => (
    <div className={`muncher-festival-section-card ${isBoxed(section.section) ? "muncher-festival-section-card--boxed" : ""}`.trim()}>
        {showEyebrow && <div className="muncher-festival-section-eyebrow">{SECTION_LABEL[section.section]}</div>}
        {showTitle && <h3 className="muncher-festival-section-title">{note.title}</h3>}
        <RenderedNoteContent xhtml={note.renderedContent} className="muncher-festival-section-body"/>
    </div>
);

export default FestivalSectionCard;
