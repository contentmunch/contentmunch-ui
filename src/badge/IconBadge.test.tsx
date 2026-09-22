import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {IconBadge} from './IconBadge';

describe('IconBadge', () => {
    it('renders the default bell icon and badge text', () => {
        const {container} = render(<IconBadge text="12"/>);

        expect(container.querySelector('.muncher-icon-badge')).toBeInTheDocument();
        expect(container.querySelector('svg')).toBeInTheDocument();
        expect(screen.getByText('12')).toBeInTheDocument();
    });

    it('does not render a Badge when text is an empty string', () => {
        const {container} = render(<IconBadge text=""/>);
        expect(container.querySelector('.muncher-badge')).not.toBeInTheDocument();
    });

    it('applies the variant to the inner Badge', () => {
        render(<IconBadge text="5" variant="danger"/>);
        const badge = screen.getByText('5');
        expect(badge.className).toContain('muncher-badge--danger');
    });

    it('fires onClick when the icon badge is clicked', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        const {container} = render(<IconBadge text="1" onClick={onClick}/>);

        const wrapper = container.querySelector('.muncher-icon-badge') as HTMLElement;
        await user.click(wrapper);

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('passes through additional props to the wrapper element', () => {
        render(<IconBadge text="1" data-testid="my-icon-badge"/>);
        expect(screen.getByTestId('my-icon-badge')).toBeInTheDocument();
    });
});
