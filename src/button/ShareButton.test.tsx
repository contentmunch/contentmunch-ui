import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ShareButton} from './ShareButton';

describe('ShareButton', () => {
    it('renders the share trigger and hides social links until opened', () => {
        render(<ShareButton title="Check out this apartment"/>);

        expect(screen.getByText('Share')).toBeInTheDocument();
        expect(screen.queryByTitle('Share link to Twitter')).not.toBeInTheDocument();
    });

    it('opens the dropdown with social share links when the trigger is clicked', async () => {
        const user = userEvent.setup();
        render(<ShareButton title="Check out this apartment"/>);

        await user.click(screen.getByRole('button', {name: /Share/}));

        expect(screen.getByTitle('Share link to Twitter')).toBeInTheDocument();
        expect(screen.getByTitle('Share link to Facebook')).toBeInTheDocument();
        expect(screen.getByTitle('share link by Email')).toBeInTheDocument();
    });

    it('builds share links using the page title and current url', async () => {
        const user = userEvent.setup();
        render(<ShareButton title="Check out this apartment"/>);

        await user.click(screen.getByRole('button', {name: /Share/}));

        const twitterLink = screen.getByTitle('Share link to Twitter').closest('a') as HTMLAnchorElement;
        expect(twitterLink.href).toContain('https://twitter.com/share?url=');
        expect(twitterLink.href).toContain('Check%20out%20this%20apartment');

        const facebookLink = screen.getByTitle('Share link to Facebook').closest('a') as HTMLAnchorElement;
        expect(facebookLink.href).toContain('https://www.facebook.com/sharer/sharer.php?u=');

        const mailLink = screen.getByTitle('share link by Email').closest('a') as HTMLAnchorElement;
        expect(mailLink.href).toContain('mailto:?subject=Check%20out%20this%20apartment');
    });

    it('includes a copy-link button in the dropdown', async () => {
        const user = userEvent.setup();
        render(<ShareButton title="Check out this apartment"/>);

        await user.click(screen.getByRole('button', {name: /Share/}));

        expect(screen.getByRole('button', {name: 'copy link'})).toBeInTheDocument();
    });
});
