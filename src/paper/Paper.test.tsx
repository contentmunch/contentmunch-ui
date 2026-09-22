import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Paper} from './Paper';

describe('Paper', () => {
    it('renders children with the base class by default', () => {
        const {container} = render(<Paper>Content</Paper>);

        const section = container.querySelector('section');
        expect(section).toHaveClass('muncher-paper');
        expect(section).not.toHaveClass('muncher-paper-hover');
        expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('applies the hover effect class when showHoverEffect is true', () => {
        const {container} = render(<Paper showHoverEffect>Content</Paper>);

        const section = container.querySelector('section');
        expect(section).toHaveClass('muncher-paper');
        expect(section).toHaveClass('muncher-paper-hover');
    });

    it('fires the onClick handler when clicked', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        const {container} = render(<Paper onClick={onClick}>Clickable</Paper>);

        const section = container.querySelector('section') as HTMLElement;
        await user.click(section);

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not throw when clicked without an onClick handler', async () => {
        const user = userEvent.setup();
        const {container} = render(<Paper>No handler</Paper>);

        const section = container.querySelector('section') as HTMLElement;
        await expect(user.click(section)).resolves.not.toThrow();
    });
});
