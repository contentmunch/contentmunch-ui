import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {Badge} from './Badge';

describe('Badge', () => {
    it('renders children with the base class and no modifiers by default', () => {
        render(<Badge>Muncher</Badge>);

        const badge = screen.getByText('Muncher');
        expect(badge).toHaveClass('muncher-badge');
        expect(badge.className).not.toContain('muncher-badge--rounded');
        expect(badge.className).not.toContain('muncher-badge--border');
    });

    it('applies the variant modifier class', () => {
        render(<Badge variant="primary">Primary</Badge>);
        const badge = screen.getByText('Primary');
        expect(badge.className).toContain('muncher-badge--primary');
    });

    it('applies the rounded modifier class when rounded is true', () => {
        render(<Badge rounded>Rounded</Badge>);
        const badge = screen.getByText('Rounded');
        expect(badge.className).toContain('muncher-badge--rounded');
    });

    it('applies the border modifier class when border is true', () => {
        render(<Badge border>Bordered</Badge>);
        const badge = screen.getByText('Bordered');
        expect(badge.className).toContain('muncher-badge--border');
    });

    it('applies variant, rounded and border modifiers together', () => {
        render(<Badge variant="danger" rounded border>Danger</Badge>);
        const badge = screen.getByText('Danger');
        expect(badge.className).toContain('muncher-badge--danger');
        expect(badge.className).toContain('muncher-badge--rounded');
        expect(badge.className).toContain('muncher-badge--border');
    });

    it('passes through additional props to the underlying element', () => {
        render(<Badge data-testid="my-badge">Tagged</Badge>);
        expect(screen.getByTestId('my-badge')).toBeInTheDocument();
    });
});
