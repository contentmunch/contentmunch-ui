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
// strings and into notes in the first place.
export const FestivalSectionCard: React.FC<FestivalSectionCardProps> = ({note, section}) => (
    <div className="muncher-festival-section-card">
        <div className="muncher-festival-section-eyebrow">{SECTION_LABEL[section.section]}</div>
        <h3 className="muncher-festival-section-title">{note.title}</h3>
        <RenderedNoteContent xhtml={note.renderedContent} className="muncher-festival-section-body"/>
    </div>
);

export default FestivalSectionCard;
