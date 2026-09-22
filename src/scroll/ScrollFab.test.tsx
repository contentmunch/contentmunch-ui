import {afterEach, describe, expect, it, vi} from 'vitest';
import {act, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ScrollFab} from './ScrollFab.tsx';

const setScrollY = (value: number) => {
    Object.defineProperty(window, 'scrollY', {value, writable: true, configurable: true});
};

const setInnerHeight = (value: number) => {
    Object.defineProperty(window, 'innerHeight', {value, writable: true, configurable: true});
};

const fireScroll = () => {
    act(() => {
        window.dispatchEvent(new Event('scroll'));
    });
};

describe('ScrollFab', () => {
    afterEach(() => {
        setScrollY(0);
        setInnerHeight(768);
    });

    it('renders nothing before the scroll threshold is reached', () => {
        setInnerHeight(768);
        setScrollY(0);
        const {container} = render(<ScrollFab/>);

        expect(container).toBeEmptyDOMElement();
    });

    it('renders the scroll-to-top button once scrolled past the threshold', () => {
        setInnerHeight(768);
        render(<ScrollFab/>);

        setScrollY(600);
        fireScroll();

        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('applies the given variant class modifier to the button', () => {
        setInnerHeight(768);
        render(<ScrollFab variant="primary"/>);

        setScrollY(600);
        fireScroll();

        expect(screen.getByRole('button').className).toContain('muncher-button--primary');
    });

    it('scrolls the window to the top when clicked', async () => {
        setInnerHeight(768);
        const user = userEvent.setup();
        const scrollToSpy = vi.fn();
        window.scrollTo = scrollToSpy;
        render(<ScrollFab/>);

        setScrollY(600);
        fireScroll();

        await user.click(screen.getByRole('button'));

        expect(scrollToSpy).toHaveBeenCalledWith({top: 0, behavior: 'smooth'});
    });
});
