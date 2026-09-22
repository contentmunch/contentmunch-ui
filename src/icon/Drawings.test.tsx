import {describe, expect, it} from 'vitest';
import {isValidElement} from 'react';
import {drawings} from './Drawings';

describe('drawings', () => {
    const entries = Object.entries(drawings);

    it('exports a non-empty lookup map of icon name to a valid React element', () => {
        expect(entries.length).toBeGreaterThan(0);

        for (const [name, glyph] of entries) {
            expect(isValidElement(glyph), `expected drawings.${name} to be a valid React element`).toBe(true);
        }
    });

    it('gives every glyph at least one SVG child so it renders visible strokes', () => {
        for (const [name, glyph] of entries) {
            const children = (glyph as {props: {children: unknown}}).props.children;
            const childArray = Array.isArray(children) ? children : [children];

            expect(childArray.length, `expected drawings.${name} to have at least one child`).toBeGreaterThan(0);
            expect(childArray.every(Boolean), `expected drawings.${name} to have no empty children`).toBe(true);
        }
    });

    it('includes the well-known icons referenced elsewhere in the library', () => {
        for (const name of ['search', 'muncher', 'close', 'check']) {
            expect(drawings).toHaveProperty(name);
        }
    });
});
