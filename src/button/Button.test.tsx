import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Button} from './Button';

describe('Button', () => {
    it('renders children and defaults to a medium, type="button" element', () => {
        render(<Button>Click me</Button>);

        const button = screen.getByRole('button', {name: 'Click me'});
        expect(button).toHaveAttribute('type', 'button');
        expect(button.className).toContain('muncher-button--medium');
    });

    it('applies variant, size, active, rounded, bordered and custom class modifiers', () => {
        render(
            <Button variant="primary" size="large" active rounded bordered className="extra">
                Styled
            </Button>
        );

        const button = screen.getByRole('button', {name: 'Styled'});
        expect(button.className).toContain('muncher-button--primary');
        expect(button.className).toContain('muncher-button--large');
        expect(button.className).toContain('muncher-button--active');
        expect(button.className).toContain('muncher-button--rounded');
        expect(button.className).toContain('muncher-button--bordered');
        expect(button.className).toContain('extra');
    });

    it('treats type="nav" as a nav-styled button but renders a real type="button" element', () => {
        render(<Button type="nav">Nav</Button>);

        const button = screen.getByRole('button', {name: 'Nav'});
        expect(button).toHaveAttribute('type', 'button');
        expect(button.className).toContain('muncher-button--nav');
    });

    it('disables the button and applies the title attribute', () => {
        render(<Button disabled title="Disabled button">Disabled</Button>);

        const button = screen.getByRole('button', {name: 'Disabled'});
        expect(button).toBeDisabled();
        expect(button).toHaveAttribute('title', 'Disabled button');
    });

    it('fires the onClick handler when clicked', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(<Button onClick={onClick}>Submit</Button>);

        await user.click(screen.getByRole('button', {name: 'Submit'}));

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not fire onClick when disabled', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(<Button disabled onClick={onClick}>Submit</Button>);

        await user.click(screen.getByRole('button', {name: 'Submit'}));

        expect(onClick).not.toHaveBeenCalled();
    });
});
