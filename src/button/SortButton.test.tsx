import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {SortButton} from './SortButton';

describe('SortButton', () => {
    it('renders children and the sort title', () => {
        render(<SortButton title="Sort Button">Button</SortButton>);

        const button = screen.getByRole('button', {name: 'Button'});
        expect(button).toHaveAttribute('title', 'Sort Button');
    });

    it('does not show the sort icon when inactive and not hovered', () => {
        const {container} = render(<SortButton title="Sort Button">Button</SortButton>);

        expect(container.querySelector('svg')).not.toBeInTheDocument();
    });

    it('shows the sort icon when active', () => {
        const {container} = render(<SortButton title="Sort Button" active>Button</SortButton>);

        expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('shows the sort icon while hovering, even when inactive', async () => {
        const user = userEvent.setup();
        const {container} = render(<SortButton title="Sort Button">Button</SortButton>);

        await user.hover(screen.getByRole('button', {name: 'Button'}));

        expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('hides the sort icon again after unhovering when inactive', async () => {
        const user = userEvent.setup();
        const {container} = render(<SortButton title="Sort Button">Button</SortButton>);

        const button = screen.getByRole('button', {name: 'Button'});
        await user.hover(button);
        expect(container.querySelector('svg')).toBeInTheDocument();

        await user.unhover(button);
        expect(container.querySelector('svg')).not.toBeInTheDocument();
    });

    it('fires the onClick handler when clicked', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(<SortButton title="Sort Button" onClick={onClick}>Button</SortButton>);

        await user.click(screen.getByRole('button', {name: 'Button'}));

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('applies the given variant, size and rounded modifiers', () => {
        render(<SortButton title="Sort Button" variant="primary" size="large" rounded>Button</SortButton>);

        const button = screen.getByRole('button', {name: 'Button'});
        expect(button.className).toContain('muncher-button--primary');
        expect(button.className).toContain('muncher-button--large');
        expect(button.className).toContain('muncher-button--rounded');
    });
});
