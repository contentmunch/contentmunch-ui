import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {Card} from './Card';

describe('Card', () => {
    it('renders children inside the card container', () => {
        render(
            <Card>
                <p>Card content</p>
            </Card>
        );

        expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('applies the base muncher-card class', () => {
        const {container} = render(
            <Card>
                <span>Hello</span>
            </Card>
        );

        const card = container.querySelector('.muncher-card');
        expect(card).not.toBeNull();
        expect(card).toContainElement(screen.getByText('Hello'));
    });

    it('renders multiple children', () => {
        render(
            <Card>
                <h3>Title</h3>
                <p>Body text</p>
            </Card>
        );

        expect(screen.getByRole('heading', {name: 'Title'})).toBeInTheDocument();
        expect(screen.getByText('Body text')).toBeInTheDocument();
    });
});
