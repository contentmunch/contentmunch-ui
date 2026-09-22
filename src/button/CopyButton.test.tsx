import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {CopyButton} from './CopyButton';

describe('CopyButton', () => {
    it('renders with the default label as its title', () => {
        render(<CopyButton text="This is the text from clipboard"/>);

        const button = screen.getByRole('button', {name: 'copy link'});
        expect(button).toBeInTheDocument();
    });

    it('renders with a custom label as its title', () => {
        render(<CopyButton text="some code" label="copy code"/>);

        expect(screen.getByRole('button', {name: 'copy code'})).toBeInTheDocument();
    });

    it('copies text to the clipboard and shows success feedback on click', async () => {
        const user = userEvent.setup();
        const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined);
        render(<CopyButton text="This is the text from clipboard"/>);

        const button = screen.getByRole('button', {name: 'copy link'});
        await user.click(button);

        expect(writeText).toHaveBeenCalledWith('This is the text from clipboard');
        expect(screen.getByRole('button', {name: 'copied!'})).toBeInTheDocument();
    });

    it('reverts to the original label after the feedback timeout', async () => {
        const user = userEvent.setup();
        vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined);
        render(<CopyButton text="some text" label="copy code"/>);

        await user.click(screen.getByRole('button', {name: 'copy code'}));
        expect(screen.getByRole('button', {name: 'copied!'})).toBeInTheDocument();

        await screen.findByRole('button', {name: 'copy code'}, {timeout: 3000});
    }, 10000);

    it('applies the given variant and size to the underlying button', () => {
        render(<CopyButton text="text" variant="primary" size="large"/>);

        const button = screen.getByRole('button', {name: 'copy link'});
        expect(button.className).toContain('muncher-button--primary');
        expect(button.className).toContain('muncher-button--large');
    });
});
