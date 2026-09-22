import {describe, expect, it, vi} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {DropdownButton} from './DropdownButton';

describe('DropdownButton', () => {
    it('renders the trigger element and hides dropdown content when closed', () => {
        render(
            <DropdownButton element={<p>drop down</p>} showContent={false} setShowContent={vi.fn()}>
                <p>Drop down content</p>
            </DropdownButton>
        );

        expect(screen.getByText('drop down')).toBeInTheDocument();
        expect(screen.queryByText('Drop down content')).not.toBeInTheDocument();
    });

    it('shows dropdown content when showContent is true', () => {
        render(
            <DropdownButton element={<p>drop down</p>} showContent setShowContent={vi.fn()}>
                <p>Drop down content</p>
            </DropdownButton>
        );

        expect(screen.getByText('Drop down content')).toBeInTheDocument();
    });

    it('calls setShowContent(true) and onClick when the trigger button is clicked', async () => {
        const user = userEvent.setup();
        const setShowContent = vi.fn();
        const onClick = vi.fn();
        render(
            <DropdownButton element={<p>drop down</p>} showContent={false} setShowContent={setShowContent}
                             onClick={onClick}>
                <p>Drop down content</p>
            </DropdownButton>
        );

        await user.click(screen.getByRole('button'));

        expect(setShowContent).toHaveBeenCalledWith(true);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('closes the dropdown and calls onClose when clicking outside', async () => {
        const user = userEvent.setup();
        const setShowContent = vi.fn();
        const onClose = vi.fn();
        render(
            <div>
                <DropdownButton element={<p>drop down</p>} showContent setShowContent={setShowContent}
                                 onClose={onClose}>
                    <p>Drop down content</p>
                </DropdownButton>
                <button>outside</button>
            </div>
        );

        await user.click(screen.getByText('outside'));

        expect(setShowContent).toHaveBeenCalledWith(false);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('closes the dropdown when the Escape key is pressed', () => {
        const setShowContent = vi.fn();
        const onClose = vi.fn();
        render(
            <DropdownButton element={<p>drop down</p>} showContent setShowContent={setShowContent}
                             onClose={onClose}>
                <p>Drop down content</p>
            </DropdownButton>
        );

        fireEvent.keyDown(document, {keyCode: 27});

        expect(setShowContent).toHaveBeenCalledWith(false);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('renders a drop indicator icon when withDropIcon is set', () => {
        render(
            <DropdownButton element={<p>drop down</p>} showContent={false} setShowContent={vi.fn()} withDropIcon>
                <p>content</p>
            </DropdownButton>
        );

        expect(screen.getByText('▼')).toBeInTheDocument();
    });
});
