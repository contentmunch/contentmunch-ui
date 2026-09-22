import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {Step} from './Step';

describe('Step', () => {
    it('renders children inside the badge when inactive and not completed', () => {
        render(<Step>1</Step>);

        expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('renders a non-breaking space label when no label is provided', () => {
        const {container} = render(<Step>1</Step>);

        const label = container.querySelector('.muncher-step--label');
        expect(label).not.toBeNull();
        expect(label?.textContent).toBe(' ');
    });

    it('renders the provided label text', () => {
        render(<Step label="You are here">1</Step>);

        expect(screen.getByText('You are here')).toBeInTheDocument();
    });

    it('applies the primary variant and no border when active', () => {
        const {container} = render(<Step active>1</Step>);

        const badge = container.querySelector('.muncher-badge');
        expect(badge?.className).toContain('muncher-badge--primary');
        expect(badge?.className).not.toContain('muncher-badge--border');
    });

    it('applies the secondary variant and no border, and shows a check icon when completed', () => {
        const {container} = render(<Step completed>1</Step>);

        const badge = container.querySelector('.muncher-badge');
        expect(badge?.className).toContain('muncher-badge--secondary');
        expect(badge?.className).not.toContain('muncher-badge--border');
        // completed steps render the check icon instead of children
        expect(screen.queryByText('1')).not.toBeInTheDocument();
        expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('applies the transparent variant with a border when neither active nor completed', () => {
        const {container} = render(<Step>1</Step>);

        const badge = container.querySelector('.muncher-badge');
        expect(badge?.className).toContain('muncher-badge--transparent');
        expect(badge?.className).toContain('muncher-badge--border');
    });

    it('prefers the completed check icon over active styling for content when both are set', () => {
        const {container} = render(<Step active completed>1</Step>);

        expect(screen.queryByText('1')).not.toBeInTheDocument();
        expect(container.querySelector('svg')).toBeInTheDocument();
    });
});
