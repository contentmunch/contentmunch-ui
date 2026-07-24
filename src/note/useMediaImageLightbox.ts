import {useCallback, useState} from "react";

export interface MediaImageLightboxState {
    type: "image";
    src: string;
    alt: string;
    caption?: string;
}

export interface DiagramLightboxState {
    type: "diagram";
    svg: string; // outerHTML snapshot -- see note below on why not the live node
}

export type LightboxState = MediaImageLightboxState | DiagramLightboxState;

// Delegated rather than per-item state: note content can arrive as either a
// live React tree or raw XHTML dropped in via dangerouslySetInnerHTML, so a
// single listener on the container -- keyed off markup already present in
// that content -- is the one approach that works for both images and
// Mermaid's own rendered <svg id="mermaid-..."> output.
export const useMediaImageLightbox = () => {
    const [lightbox, setLightbox] = useState<LightboxState | null>(null);

    const openFromElement = useCallback((target: Element): boolean => {
        const img = target.closest<HTMLImageElement>(".media-image-wrap .media-image");
        if (img) {
            const captionEl = img
                .closest(".media-image-wrap")
                ?.querySelector<HTMLElement>(".media-image-caption [data-link-text]");
            setLightbox({type: "image", src: img.src, alt: img.alt, caption: captionEl?.textContent ?? undefined});
            return true;
        }

        const diagram = target.closest<SVGSVGElement>('svg[id^="mermaid-"]');
        if (diagram) {
            // Mermaid's <svg> carries a viewBox but only a percentage (or no)
            // width/height, so it has no intrinsic size of its own -- just an
            // aspect ratio. That's invisible in the note body because it sits
            // in normal flow, but the lightbox centers content in a flex
            // column, where a replaced element with no intrinsic size and an
            // unresolvable percentage width collapses to 0x0. An <img> never
            // hits this because it always has a real decoded natural size.
            // Stamping explicit width/height from the viewBox onto a clone
            // (not the live node, so the in-page diagram is untouched) gives
            // it the same kind of concrete intrinsic size an image has, so
            // the existing max-width/max-height CSS can scale it correctly.
            const clone = diagram.cloneNode(true) as SVGSVGElement;
            const {width, height} = diagram.viewBox.baseVal;
            if (width && height) {
                clone.setAttribute("width", String(width));
                clone.setAttribute("height", String(height));
            }
            setLightbox({type: "diagram", svg: clone.outerHTML});
            return true;
        }

        return false;
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
