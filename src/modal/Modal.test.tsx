import {describe, expect, it, vi, beforeEach, afterEach} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Modal} from './Modal';

describe('Modal', () => {
    beforeEach(() => {
        document.body.style.overflow = '';
    });

    afterEach(() => {
        document.body.style.overflow = '';
    });

    it('renders children regardless of show state', () => {
        const setShow = vi.fn();
        render(
            <Modal show={false} setShow={setShow}>
                <h2>Modal title</h2>
            </Modal>
        );

        expect(screen.getByText('Modal title')).toBeInTheDocument();
    });

    it('translates the modal off-screen and hides it when show is false', () => {
        const setShow = vi.fn();
        const {container} = render(
            <Modal show={false} setShow={setShow}>
                <span>Body</span>
            </Modal>
        );

        const modal = container.querySelector('.muncher-modal') as HTMLElement;
        expect(modal.style.transform).toBe('translateY(-100vh)');
        expect(modal.style.opacity).toBe('0');
    });

    it('translates the modal on-screen and shows it when show is true', () => {
        const setShow = vi.fn();
        const {container} = render(
            <Modal show setShow={setShow}>
                <span>Body</span>
            </Modal>
        );

        const modal = container.querySelector('.muncher-modal') as HTMLElement;
        expect(modal.style.transform).toBe('translateY(0)');
        expect(modal.style.opacity).toBe('1');
    });

    it('does not render a backdrop when show is false', () => {
        const setShow = vi.fn();
        const {container} = render(
            <Modal show={false} setShow={setShow}>
                <span>Body</span>
            </Modal>
        );

        expect(container.querySelector('.muncher-backdrop')).not.toBeInTheDocument();
    });

    it('renders a backdrop when show is true and closes on backdrop click', async () => {
        const user = userEvent.setup();
        const setShow = vi.fn();
        const {container} = render(
            <Modal show setShow={setShow}>
                <span>Body</span>
            </Modal>
        );

        const backdrop = container.querySelector('.muncher-backdrop') as HTMLElement;
        expect(backdrop).toBeInTheDocument();

        await user.click(backdrop);

        expect(setShow).toHaveBeenCalledWith(false);
    });

    it('closes the modal when the Escape key is pressed', async () => {
        const user = userEvent.setup();
        const setShow = vi.fn();
        render(
            <Modal show setShow={setShow}>
                <span>Body</span>
            </Modal>
        );

        await user.keyboard('{Escape}');

        expect(setShow).toHaveBeenCalledWith(false);
    });

    it('locks body scroll while shown and restores it on unmount', () => {
        const setShow = vi.fn();
        const {unmount} = render(
            <Modal show setShow={setShow}>
                <span>Body</span>
            </Modal>
        );

        expect(document.body.style.overflow).toBe('hidden');

        unmount();

        expect(document.body.style.overflow).toBe('unset');
    });

    it('does not lock body scroll when not shown', () => {
        const setShow = vi.fn();
        render(
            <Modal show={false} setShow={setShow}>
                <span>Body</span>
            </Modal>
        );

        expect(document.body.style.overflow).not.toBe('hidden');
    });

    it('passes through additional props to the modal element', () => {
        const setShow = vi.fn();
        render(
            <Modal show setShow={setShow} data-testid="my-modal">
                <span>Body</span>
            </Modal>
        );

        expect(screen.getByTestId('my-modal')).toBeInTheDocument();
    });
});
