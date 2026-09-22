import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Textarea} from './Textarea';

describe('Textarea', () => {
    it('renders a textarea with placeholder and no label when none is provided', () => {
        render(<Textarea name="question" placeholder="Type your question"/>);

        const textarea = screen.getByPlaceholderText('Type your question');
        expect(textarea.tagName).toBe('TEXTAREA');
    });

    it('associates the textarea with its label', () => {
        render(<Textarea name="question" label="Your question" placeholder="Type your question"/>);

        expect(screen.getByLabelText('Your question', {exact: false})).toBeInTheDocument();
    });

    it('shows a required asterisk on the label when required', () => {
        render(<Textarea name="question" label="Your question" required/>);

        expect(screen.getByText('Your question', {exact: false}).textContent).toBe('Your question*');
    });

    it('does not show an asterisk when not required', () => {
        render(<Textarea name="question" label="Your question"/>);

        expect(screen.getByText('Your question', {exact: false}).textContent).toBe('Your question');
    });

    it('renders the prefilled value', () => {
        render(<Textarea name="question" label="Your question" value="This textarea already has some content in it."/>);

        expect(screen.getByLabelText('Your question', {exact: false})).toHaveValue(
            'This textarea already has some content in it.'
        );
    });

    it('applies readOnly when specified', () => {
        render(<Textarea name="question" label="Your question" value="can't be edited" readOnly/>);

        expect(screen.getByLabelText('Your question', {exact: false})).toHaveAttribute('readonly');
    });

    it('shows the remaining character count by default, based on maxLength', () => {
        render(<Textarea name="question" label="Your question" value="hello" maxLength={140}/>);

        expect(screen.getByText('135 characters left')).toBeInTheDocument();
    });

    it('hides the character count when showCount is false', () => {
        render(<Textarea name="question" label="Your question" showCount={false}/>);

        expect(screen.queryByText(/characters left/)).not.toBeInTheDocument();
    });

    it('applies custom rows and maxLength attributes', () => {
        render(<Textarea name="story" label="Tell us your story" rows={12} maxLength={140}/>);

        const textarea = screen.getByLabelText('Tell us your story', {exact: false});
        expect(textarea).toHaveAttribute('rows', '12');
        expect(textarea).toHaveAttribute('maxlength', '140');
    });

    it('autofocuses when focus is true', () => {
        render(<Textarea name="question" label="Your question" focus/>);

        expect(screen.getByLabelText('Your question', {exact: false})).toHaveFocus();
    });

    it('fires onChange and updates the character count as the user types', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<Textarea name="question" label="Your question" value="" onChange={onChange} maxLength={140}/>);

        const textarea = screen.getByLabelText('Your question', {exact: false});
        await user.type(textarea, 'hi');

        expect(onChange).toHaveBeenCalled();
    });
});
