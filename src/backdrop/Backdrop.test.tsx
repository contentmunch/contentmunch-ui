import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Backdrop} from './Backdrop';

describe('Backdrop', () => {
    it('renders nothing when show is not set (default false)', () => {
        const {container} = render(<Backdrop/>);
        expect(container).toBeEmptyDOMElement();
    });

    it('renders nothing when show is explicitly false', () => {
        const {container} = render(<Backdrop show={false}/>);
        expect(container).toBeEmptyDOMElement();
    });

    it('renders the backdrop element when show is true', () => {
        const {container} = render(<Backdrop show/>);
        const backdrop = container.querySelector('.muncher-backdrop');
        expect(backdrop).toBeInTheDocument();
    });

    it('applies a custom className alongside the default class', () => {
        const {container} = render(<Backdrop show className="extra"/>);
        const backdrop = container.querySelector('.muncher-backdrop');
        expect(backdrop).toHaveClass('muncher-backdrop', 'extra');
    });

    it('fires backdropClickHandler when clicked', async () => {
        const user = userEvent.setup();
        const backdropClickHandler = vi.fn();
        const {container} = render(<Backdrop show backdropClickHandler={backdropClickHandler}/>);

        const backdrop = container.querySelector('.muncher-backdrop') as HTMLElement;
        await user.click(backdrop);

        expect(backdropClickHandler).toHaveBeenCalledTimes(1);
    });

    it('does not throw when clicked without a handler', async () => {
        const user = userEvent.setup();
        const {container} = render(<Backdrop show/>);

        const backdrop = container.querySelector('.muncher-backdrop') as HTMLElement;
        await expect(user.click(backdrop)).resolves.not.toThrow();
    });

    it('passes through additional props to the backdrop element', () => {
        const {container} = render(<Backdrop show data-testid="my-backdrop"/>);
        expect(screen.getByTestId('my-backdrop')).toBeInTheDocument();
        expect(container.querySelector('.muncher-backdrop')).toBe(screen.getByTestId('my-backdrop'));
    });
});
