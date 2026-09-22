import {describe, expect, it} from 'vitest';
import {render} from '@testing-library/react';
import {Hr} from './Hr';

describe('Hr', () => {
    it('renders an hr with only the base class by default', () => {
        const {container} = render(<Hr/>);

        const hr = container.querySelector('hr');
        expect(hr).toBeInTheDocument();
        expect(hr?.className).toBe('muncher-hr');
    });

    it('applies the variant modifier class', () => {
        const {container} = render(<Hr variant="secondary"/>);

        const hr = container.querySelector('hr');
        expect(hr?.className).toContain('muncher-hr--secondary');
    });

    it('applies the size modifier class', () => {
        const {container} = render(<Hr size="large"/>);

        const hr = container.querySelector('hr');
        expect(hr?.className).toContain('muncher-hr--large');
    });

    it('applies the style modifier class for dotted', () => {
        const {container} = render(<Hr style="dotted"/>);

        const hr = container.querySelector('hr');
        expect(hr?.className).toContain('muncher-hr--dotted');
    });

    it('applies the style modifier class for dashed', () => {
        const {container} = render(<Hr style="dashed"/>);

        const hr = container.querySelector('hr');
        expect(hr?.className).toContain('muncher-hr--dashed');
    });

    it('combines variant, size and style modifiers together', () => {
        const {container} = render(<Hr variant="secondary" size="small" style="dotted"/>);

        const hr = container.querySelector('hr');
        expect(hr?.className).toBe('muncher-hr muncher-hr--secondary muncher-hr--small muncher-hr--dotted');
    });
});
