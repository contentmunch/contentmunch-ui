import {useCallback, useState} from "react";

export interface MediaImageLightboxState {
    src: string;
    alt: string;
    caption?: string;
}

// Delegated rather than per-image state: note content can arrive as either a
// live React tree or raw XHTML dropped in via dangerouslySetInnerHTML, so a
// single listener on the container -- keyed off the .media-image class already
// present in that markup -- is the one approach that works for both.
export const useMediaImageLightbox = () => {
    const [lightbox, setLightbox] = useState<MediaImageLightboxState | null>(null);

    const openFromElement = useCallback((target: Element): boolean => {
        const img = target.closest<HTMLImageElement>(".media-image-wrap .media-image");
        if (!img) return false;

        const captionEl = img
            .closest(".media-image-wrap")
            ?.querySelector<HTMLElement>(".media-image-caption [data-link-text]");

        setLightbox({src: img.src, alt: img.alt, caption: captionEl?.textContent ?? undefined});
        return true;
    }, []);

    const handleClick = useCallback((e: React.MouseEvent) => {
        openFromElement(e.target as Element);
    }, [openFromElement]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        if (openFromElement(e.target as Element)) e.preventDefault();
    }, [openFromElement]);

    const close = useCallback(() => setLightbox(null), []);

    return {lightbox, handleClick, handleKeyDown, close};
};
