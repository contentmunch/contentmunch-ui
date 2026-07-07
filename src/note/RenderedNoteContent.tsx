import * as React from "react";
import "./assets/note-content.css";

export const RenderedNoteContent: React.FC<RenderedNoteContentProps> = ({xhtml, className = ""}) => {
    return (
        <section
            className={`muncher-note-content ${className}`.trim()}
            dangerouslySetInnerHTML={{__html: xhtml}}
        />
    );
};

export interface RenderedNoteContentProps {
    xhtml: string;
    className?: string;
}
