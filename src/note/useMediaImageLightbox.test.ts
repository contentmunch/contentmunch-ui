import {describe, expect, it} from 'vitest';
import {act, renderHook} from '@testing-library/react';
import type React from 'react';
import {useMediaImageLightbox} from './useMediaImageLightbox';

const mouseEventFor = (target: Element): React.MouseEvent =>
    ({target} as unknown as React.MouseEvent);

const keyDownEventFor = (target: Element, key: string) => {
    const preventDefault = () => {
        prevented = true;
    };
    let prevented = false;
    const event = {target, key, preventDefault} as unknown as React.KeyboardEvent;
    return {event, wasPrevented: () => prevented};
};

describe('useMediaImageLightbox', () => {
    it('starts with no lightbox open', () => {
        const {result} = renderHook(() => useMediaImageLightbox());
        expect(result.current.lightbox).toBeNull();
    });

    it('opens an image lightbox when clicking a .media-image inside a .media-image-wrap', () => {
        document.body.innerHTML = `
            <span class="media-image-wrap">
                <img class="media-image" src="https://example.com/a.jpg" alt="A photo"/>
            </span>
        `;
        const img = document.querySelector('.media-image') as HTMLImageElement;
        const {result} = renderHook(() => useMediaImageLightbox());

        act(() => {
            result.current.handleClick(mouseEventFor(img));
        });

        expect(result.current.lightbox).toEqual({
            type: 'image',
            src: 'https://example.com/a.jpg',
            alt: 'A photo',
            caption: undefined,
        });
    });

    it('captures the caption text when the image wrap has a caption link', () => {
        document.body.innerHTML = `
            <span class="media-image-wrap">
                <img class="media-image" src="https://example.com/a.jpg" alt="A photo"/>
                <span class="media-image-caption"><span data-link-text>My caption</span></span>
            </span>
        `;
        const img = document.querySelector('.media-image') as HTMLImageElement;
        const {result} = renderHook(() => useMediaImageLightbox());

        act(() => {
            result.current.handleClick(mouseEventFor(img));
        });

        expect(result.current.lightbox).toMatchObject({type: 'image', caption: 'My caption'});
    });

    it('opens a diagram lightbox when clicking a mermaid svg, cloning it with explicit width/height', () => {
        document.body.innerHTML = `<svg id="mermaid-abc" viewBox="0 0 100 50"><rect/></svg>`;
        const svg = document.querySelector('svg#mermaid-abc') as SVGSVGElement;
        // jsdom doesn't compute layout, so viewBox.baseVal needs an explicit stub.
        Object.defineProperty(svg, 'viewBox', {
            value: {baseVal: {width: 100, height: 50}},
            configurable: true,
        });
        const {result} = renderHook(() => useMediaImageLightbox());

        act(() => {
            result.current.handleClick(mouseEventFor(svg));
        });

        expect(result.current.lightbox?.type).toBe('diagram');
        const svgMarkup = (result.current.lightbox as {type: 'diagram'; svg: string}).svg;
        expect(svgMarkup).toContain('width="100"');
        expect(svgMarkup).toContain('height="50"');
    });

    it('leaves the lightbox closed when clicking unrelated content', () => {
        document.body.innerHTML = `<p>Just some text</p>`;
        const p = document.querySelector('p') as HTMLElement;
        const {result} = renderHook(() => useMediaImageLightbox());

        act(() => {
            result.current.handleClick(mouseEventFor(p));
        });

        expect(result.current.lightbox).toBeNull();
    });

    it('opens the lightbox on Enter/Space keydown and prevents default', () => {
        document.body.innerHTML = `
            <span class="media-image-wrap">
                <img class="media-image" src="https://example.com/a.jpg" alt="A photo"/>
            </span>
        `;
        const img = document.querySelector('.media-image') as HTMLImageElement;
        const {result} = renderHook(() => useMediaImageLightbox());

        const {event, wasPrevented} = keyDownEventFor(img, 'Enter');
        act(() => {
            result.current.handleKeyDown(event);
        });

        expect(result.current.lightbox?.type).toBe('image');
        expect(wasPrevented()).toBe(true);
    });

    it('ignores keydown events for keys other than Enter/Space', () => {
        document.body.innerHTML = `
            <span class="media-image-wrap">
                <img class="media-image" src="https://example.com/a.jpg" alt="A photo"/>
            </span>
        `;
        const img = document.querySelector('.media-image') as HTMLImageElement;
        const {result} = renderHook(() => useMediaImageLightbox());

        const {event, wasPrevented} = keyDownEventFor(img, 'Tab');
        act(() => {
            result.current.handleKeyDown(event);
        });

        expect(result.current.lightbox).toBeNull();
        expect(wasPrevented()).toBe(false);
    });

    it('closes the lightbox via close()', () => {
        document.body.innerHTML = `
            <span class="media-image-wrap">
                <img class="media-image" src="https://example.com/a.jpg" alt="A photo"/>
            </span>
        `;
        const img = document.querySelector('.media-image') as HTMLImageElement;
        const {result} = renderHook(() => useMediaImageLightbox());

        act(() => {
            result.current.handleClick(mouseEventFor(img));
        });
        expect(result.current.lightbox).not.toBeNull();

        act(() => {
            result.current.close();
        });
        expect(result.current.lightbox).toBeNull();
    });
});
