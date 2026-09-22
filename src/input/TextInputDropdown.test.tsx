import {describe, expect, it, vi} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {TextInputDropdown} from './TextInputDropdown';

describe('TextInputDropdown', () => {
    it('renders the underlying input with a label and placeholder', () => {
        render(
            <TextInputDropdown
                name="country"
                inputPlaceHolder="Search country"
                label="Country"
                showContent={false}
                setShowContent={() => {}}
                handleInputChange={() => {}}
            />
        );

        const input = screen.getByLabelText('Country', {exact: false});
        expect(input).toHaveAttribute('placeholder', 'Search country');
    });

    it('shows a required asterisk on the label when required', () => {
        render(
            <TextInputDropdown
                name="country"
                label="Country"
                required
                showContent={false}
                setShowContent={() => {}}
                handleInputChange={() => {}}
            />
        );

        expect(screen.getByText('Country', {exact: false}).textContent).toBe('Country*');
    });

    it('displays an error message when error is provided', () => {
        render(
            <TextInputDropdown
                name="country"
                label="Country"
                error="This is an error"
                showContent={false}
                setShowContent={() => {}}
                handleInputChange={() => {}}
            />
        );

        expect(screen.getByText('This is an error')).toBeInTheDocument();
    });

    it('does not render the dropdown content when showContent is false', () => {
        render(
            <TextInputDropdown
                name="country"
                label="Country"
                showContent={false}
                setShowContent={() => {}}
                handleInputChange={() => {}}
            >
                <p>Drop down content</p>
            </TextInputDropdown>
        );

        expect(screen.queryByText('Drop down content')).not.toBeInTheDocument();
    });

    it('renders the dropdown content when showContent is true', () => {
        render(
            <TextInputDropdown
                name="country"
                label="Country"
                showContent={true}
                setShowContent={() => {}}
                handleInputChange={() => {}}
            >
                <p>Drop down content</p>
            </TextInputDropdown>
        );

        expect(screen.getByText('Drop down content')).toBeInTheDocument();
    });

    it('calls handleInputChange and setShowContent(true) when the user types', async () => {
        const user = userEvent.setup();
        const handleInputChange = vi.fn();
        const setShowContent = vi.fn();
        render(
            <TextInputDropdown
                name="country"
                label="Country"
                value=""
                showContent={false}
                setShowContent={setShowContent}
                handleInputChange={handleInputChange}
            />
        );

        await user.type(screen.getByLabelText('Country', {exact: false}), 'a');

        expect(handleInputChange).toHaveBeenCalledWith('a');
        expect(setShowContent).toHaveBeenCalledWith(true);
    });

    it('closes the dropdown when the Escape key is pressed', () => {
        const setShowContent = vi.fn();
        render(
            <TextInputDropdown
                name="country"
                label="Country"
                showContent={true}
                setShowContent={setShowContent}
                handleInputChange={() => {}}
            >
                <p>Drop down content</p>
            </TextInputDropdown>
        );

        fireEvent.keyDown(document, {keyCode: 27});

        expect(setShowContent).toHaveBeenCalledWith(false);
    });

    it('calls onEnterPress when Enter is pressed in the input', async () => {
        const user = userEvent.setup();
        const onEnterPress = vi.fn();
        render(
            <TextInputDropdown
                name="country"
                label="Country"
                showContent={false}
                setShowContent={() => {}}
                handleInputChange={() => {}}
                onEnterPress={onEnterPress}
            />
        );

        const input = screen.getByLabelText('Country', {exact: false});
        await user.click(input);
        await user.keyboard('{Enter}');

        expect(onEnterPress).toHaveBeenCalledTimes(1);
    });

    it('closes the dropdown when clicking outside of it', async () => {
        const user = userEvent.setup();
        const setShowContent = vi.fn();
        render(
            <div>
                <button>Outside</button>
                <TextInputDropdown
                    name="country"
                    label="Country"
                    showContent={true}
                    setShowContent={setShowContent}
                    handleInputChange={() => {}}
                >
                    <p>Drop down content</p>
                </TextInputDropdown>
            </div>
        );

        await user.click(screen.getByText('Outside'));

        expect(setShowContent).toHaveBeenCalledWith(false);
    });
});
