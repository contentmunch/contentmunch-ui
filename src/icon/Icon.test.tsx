import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import {Icon} from './Icon';
import {drawings} from './Drawings';

describe('Icon', () => {
    it('renders the svg glyph for a valid icon name', () => {
        const {container} = render(<Icon name="search" />);

        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
        expect(svg?.querySelector('circle[cx="11"][cy="11"][r="8"]')).toBeInTheDocument();
        expect(svg?.querySelector('line[x1="21"][y1="21"]')).toBeInTheDocument();
    });

    it('renders the svg glyph looked up by iconString for a known name', () => {
        const {container} = render(<Icon iconString="muncher" />);

        const svg = container.querySelector('svg');
        expect(svg?.querySelector('rect[x="3"][y="4"]')).toBeInTheDocument();
    });

    it('falls back to the muncher glyph and warns when iconString is unknown', () => {
        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

        const {container} = render(<Icon iconString="not-a-real-icon" />);

        const svg = container.querySelector('svg');
        // muncher glyph is a rounded rect with three horizontal lines
        expect(svg?.querySelector('rect[x="3"][y="4"][width="18"][height="18"]')).toBeInTheDocument();

        warnSpy.mockRestore();
    });

    it('falls back to the muncher glyph when neither name nor iconString is provided', () => {
        const {container} = render(<Icon />);

        const svg = container.querySelector('svg');
        expect(svg?.querySelector('rect[x="3"][y="4"][width="18"][height="18"]')).toBeInTheDocument();
    });

    it('defaults to small size and applies the size modifier class', () => {
        const {container: small} = render(<Icon name="search" />);
        expect(small.querySelector('svg')?.getAttribute('class')).toBe('muncher-icon--small');

        const {container: large} = render(<Icon name="search" size="large" />);
        expect(large.querySelector('svg')?.getAttribute('class')).toBe('muncher-icon--large');
    });

    it('uses currentColor by default and a custom stroke color and weight when provided', () => {
        const {container} = render(<Icon name="search" color="red" weight={3} />);

        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('stroke', 'red');
        expect(svg).toHaveAttribute('stroke-width', '3');
    });

    it('defaults stroke to currentColor and strokeWidth to 2 when not provided', () => {
        const {container} = render(<Icon name="search" />);

        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('stroke', 'currentColor');
        expect(svg).toHaveAttribute('stroke-width', '2');
    });

    it('fires the onClick handler when the svg is clicked', () => {
        const onClick = vi.fn();
        const {container} = render(<Icon name="search" onClick={onClick} />);

        const svg = container.querySelector('svg')!;
        svg.dispatchEvent(new MouseEvent('click', {bubbles: true}));

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('renders children to the right of the icon by default (orientation="left")', () => {
        render(
            <Icon name="search">
                <p>Search</p>
            </Icon>
        );

        const text = screen.getByText('Search');
        expect(text.parentElement).toHaveClass('content-right');
    });

    it('renders children to the left of the icon when orientation="right"', () => {
        render(
            <Icon name="search" orientation="right">
                <p>Search</p>
            </Icon>
        );

        const text = screen.getByText('Search');
        expect(text.parentElement).toHaveClass('content-left');
    });

    it('renders no children wrapper span when no children are provided', () => {
        const {container} = render(<Icon name="search" />);

        expect(container.querySelector('.content-left')).not.toBeInTheDocument();
        expect(container.querySelector('.content-right')).not.toBeInTheDocument();
    });

    it('has an entry in the drawings map for every icon rendered by name in this file', () => {
        expect(drawings.search).toBeDefined();
        expect(drawings.muncher).toBeDefined();
    });
});
