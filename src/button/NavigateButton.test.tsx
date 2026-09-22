import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {NavigateButton} from './NavigateButton';

describe('NavigateButton', () => {
    it('renders a right-navigate button by default title', () => {
        render(<NavigateButton direction="right"/>);

        expect(screen.getByRole('button', {name: 'Navigate Right'})).toBeInTheDocument();
    });

    it('renders a left-navigate button with the left title', () => {
        render(<NavigateButton direction="left"/>);

        expect(screen.getByRole('button', {name: 'Navigate Left'})).toBeInTheDocument();
    });

    it('disables the button when isDisabled is set', () => {
        render(<NavigateButton direction="left" isDisabled/>);

        expect(screen.getByRole('button', {name: 'Navigate Left'})).toBeDisabled();
    });

    it('fires onClick when clicked', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(<NavigateButton direction="right" onClick={onClick}/>);

        await user.click(screen.getByRole('button', {name: 'Navigate Right'}));

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not fire onClick when disabled', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(<NavigateButton direction="right" isDisabled onClick={onClick}/>);

        await user.click(screen.getByRole('button', {name: 'Navigate Right'}));

        expect(onClick).not.toHaveBeenCalled();
    });

    it('wraps the button in a navigate-left container class for left direction', () => {
        const {container} = render(<NavigateButton direction="left"/>);

        expect(container.querySelector('.muncher-button--navigate-left')).toBeInTheDocument();
    });

    it('wraps the button in a navigate-right container class for right direction', () => {
        const {container} = render(<NavigateButton direction="right"/>);

        expect(container.querySelector('.muncher-button--navigate-right')).toBeInTheDocument();
    });
});
