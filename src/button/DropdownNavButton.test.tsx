import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {DropdownNavButton} from './DropdownNavButton';

describe('DropdownNavButton', () => {
    it('renders the trigger element and its dropdown content', () => {
        render(
            <DropdownNavButton title="Default Nav Dropdown" element={<p>drop down</p>}>
                <p>Drop down content</p>
            </DropdownNavButton>
        );

        expect(screen.getByText('drop down')).toBeInTheDocument();
        expect(screen.getByText('Drop down content')).toBeInTheDocument();
    });

    it('renders a nav-styled button with the given title', () => {
        render(
            <DropdownNavButton title="Default Nav Dropdown" element={<p>drop down</p>}>
                <p>content</p>
            </DropdownNavButton>
        );

        const button = screen.getByRole('button', {name: 'drop down'});
        expect(button).toHaveAttribute('title', 'Default Nav Dropdown');
        expect(button.className).toContain('muncher-button--nav');
    });

    it('applies the drop-left class when dropLeft is set', () => {
        const {container} = render(
            <DropdownNavButton title="Default Nav Dropdown" element={<p>drop down</p>} dropLeft>
                <p>content</p>
            </DropdownNavButton>
        );

        expect(container.querySelector('.muncher-dropdown-nav')?.className).toContain('drop-left');
    });

    it('does not apply the drop-left class by default', () => {
        const {container} = render(
            <DropdownNavButton title="Default Nav Dropdown" element={<p>drop down</p>}>
                <p>content</p>
            </DropdownNavButton>
        );

        expect(container.querySelector('.muncher-dropdown-nav')?.className).not.toContain('drop-left');
    });

    it('disables the trigger button when disabled is set', () => {
        render(
            <DropdownNavButton title="Default Nav Dropdown" element={<p>drop down</p>} disabled>
                <p>content</p>
            </DropdownNavButton>
        );

        expect(screen.getByRole('button', {name: 'drop down'})).toBeDisabled();
    });

    it('applies the active and rounded modifiers', () => {
        render(
            <DropdownNavButton title="Default Nav Dropdown" element={<p>drop down</p>} active rounded>
                <p>content</p>
            </DropdownNavButton>
        );

        const button = screen.getByRole('button', {name: 'drop down'});
        expect(button.className).toContain('muncher-button--active');
        expect(button.className).toContain('muncher-button--rounded');
    });
});
