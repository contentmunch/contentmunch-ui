import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {LargeRoundedBadge} from './LargeRoundedBadge';

describe('LargeRoundedBadge', () => {
    it('renders children with a tertiary rounded badge by default', () => {
        const {container} = render(
            <LargeRoundedBadge>
                <div className="badge-content"><p>Step</p><p className="emphasized">1</p></div>
            </LargeRoundedBadge>
        );

        expect(container.querySelector('.muncher-badge--large-rounded')).toBeInTheDocument();
        expect(screen.getByText('Step')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();

        const badge = container.querySelector('.muncher-badge');
        expect(badge).toHaveClass('muncher-badge--tertiary');
        expect(badge).toHaveClass('muncher-badge--rounded');
    });

    it('applies the given variant to the inner badge', () => {
        const {container} = render(
            <LargeRoundedBadge variant="primary">
                <p>Content</p>
            </LargeRoundedBadge>
        );

        const badge = container.querySelector('.muncher-badge');
        expect(badge).toHaveClass('muncher-badge--primary');
    });

    it('renders a check icon instead of children when completed is true', () => {
        const {container} = render(
            <LargeRoundedBadge completed>
                <p>Should not render</p>
            </LargeRoundedBadge>
        );

        expect(screen.queryByText('Should not render')).not.toBeInTheDocument();
        expect(container.querySelector('.badge-content svg')).toBeInTheDocument();
    });

    it('renders children when completed is false', () => {
        render(
            <LargeRoundedBadge completed={false}>
                <p>Visible content</p>
            </LargeRoundedBadge>
        );

        expect(screen.getByText('Visible content')).toBeInTheDocument();
    });
});
