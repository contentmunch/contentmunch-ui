import {describe, expect, it} from 'vitest';
import {render} from '@testing-library/react';
import {Star} from './Star';

describe('Star', () => {
    it('renders with only the base class and sets the --r css variable from rating', () => {
        const {container} = render(<Star rating={3.4}/>);

        const star = container.firstChild as HTMLElement;
        expect(star.className).toBe('muncher-star');
        expect(star.style.getPropertyValue('--r')).toBe('3.4');
    });

    it('applies the color class modifier', () => {
        const {container} = render(<Star rating={3} color="green"/>);

        const star = container.firstChild as HTMLElement;
        expect(star.className).toBe('muncher-star star-green');
    });

    it('applies the size class modifier', () => {
        const {container} = render(<Star rating={3} size="small"/>);

        const star = container.firstChild as HTMLElement;
        expect(star.className).toBe('muncher-star star-small');
    });

    it('applies both color and size class modifiers together', () => {
        const {container} = render(<Star rating={4.5} color="red" size="large"/>);

        const star = container.firstChild as HTMLElement;
        expect(star.className).toBe('muncher-star star-red star-large');
    });

    it('passes through additional props such as onClick and title', async () => {
        const {container} = render(<Star rating={2} title="2 stars"/>);

        const star = container.firstChild as HTMLElement;
        expect(star).toHaveAttribute('title', '2 stars');
    });
});
