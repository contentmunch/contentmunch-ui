import * as React from "react";
import "./assets/note-content.css";
import {ImageLightbox} from "./ImageLightbox";
import {useMediaImageLightbox} from "./useMediaImageLightbox";

export const RenderedNoteContent: React.FC<RenderedNoteContentProps> = ({xhtml, className = ""}) => {
    const {lightbox, handleClick, handleKeyDown, close} = useMediaImageLightbox();

    return (
        <>
            <section
                className={`muncher-note-content ${className}`.trim()}
                dangerouslySetInnerHTML={{__html: xhtml}}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
            />
            <ImageLightbox
                show={lightbox !== null}
                src={lightbox?.src}
                alt={lightbox?.alt}
                caption={lightbox?.caption}
                onClose={close}
            />
        </>
    );
};

export interface RenderedNoteContentProps {
    xhtml: string;
    className?: string;
}
