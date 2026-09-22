import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {Li} from './Li';

describe('Li', () => {
    it('renders children with the default (non-featured) class', () => {
        const {container} = render(<Li>Bonus room</Li>);

        const li = container.querySelector('li');
        expect(li).toHaveClass('muncher-li');
        expect(li).not.toHaveClass('featured');
        expect(screen.getByText('Bonus room')).toBeInTheDocument();
    });

    it('applies the featured class when isFeatured is true', () => {
        const {container} = render(<Li isFeatured>Featured room</Li>);

        const li = container.querySelector('li');
        expect(li).toHaveClass('muncher-li');
        expect(li).toHaveClass('featured');
    });

    it('renders the default bullet icon (arrow-right) at small size', () => {
        const {container} = render(<Li>Default bullet</Li>);

        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveClass('muncher-icon--small');
    });

    it('renders a custom bullet icon, size and color', () => {
        const {container} = render(
            <Li bulletIcon="check" bulletSize="large" bulletColor="green">
                Gourmet kitchen
            </Li>
        );

        const svg = container.querySelector('svg');
        expect(svg).toHaveClass('muncher-icon--large');
        expect(svg).toHaveAttribute('stroke', 'green');
    });

    it('applies the bulletWeight as the icon stroke width', () => {
        const {container} = render(
            <Li bulletWeight={3}>Thick bullet</Li>
        );

        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('stroke-width', '3');
    });
});
