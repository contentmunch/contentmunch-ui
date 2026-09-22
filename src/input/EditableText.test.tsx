import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {EditableText} from './EditableText';

describe('EditableText', () => {
    it('renders the value as display text with an associated label', () => {
        render(<EditableText name="title" label="Title" value="Click to edit me" required/>);

        expect(screen.getByText('Click to edit me')).toBeInTheDocument();
        expect(screen.getByText('Title', {exact: false}).textContent).toBe('Title*');
    });

    it('shows the emptyText fallback when value is empty and no placeholder given', () => {
        render(<EditableText name="title" value="" emptyText="No title set"/>);

        expect(screen.getByText('No title set')).toBeInTheDocument();
    });

    it('shows the placeholder over emptyText when value is empty', () => {
        render(<EditableText name="title" value="" placeholder="Type a value" emptyText="No title set"/>);

        expect(screen.getByText('Type a value')).toBeInTheDocument();
        expect(screen.queryByText('No title set')).not.toBeInTheDocument();
    });

    it('displays the error message when error is provided', () => {
        render(<EditableText name="title" value="x" error="Title cannot be empty"/>);

        expect(screen.getByText('Title cannot be empty')).toBeInTheDocument();
    });

    it('displays the info message when information is provided', () => {
        render(<EditableText name="title" value="x" information="Shown on the dashboard"/>);

        expect(screen.getByText('Shown on the dashboard')).toBeInTheDocument();
    });

    it('switches to an editable input when the display is clicked', async () => {
        const user = userEvent.setup();
        render(<EditableText name="title" label="Title" value="Click to edit me"/>);

        await user.click(screen.getByText('Click to edit me'));

        expect(screen.getByRole('textbox')).toHaveValue('Click to edit me');
    });

    it('does not enter edit mode when readOnly', async () => {
        const user = userEvent.setup();
        render(<EditableText name="title" value="Click to edit me" readOnly/>);

        await user.click(screen.getByText('Click to edit me'));

        expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });

    it('calls onEditComplete with the new value on blur when it changed', async () => {
        const user = userEvent.setup();
        const onEditComplete = vi.fn();
        render(<EditableText name="title" value="old" onEditComplete={onEditComplete}/>);

        await user.click(screen.getByText('old'));
        const input = screen.getByRole('textbox');
        await user.clear(input);
        await user.type(input, 'new');
        await user.tab();

        expect(onEditComplete).toHaveBeenCalledWith('new');
    });

    it('does not call onEditComplete when the value is unchanged on blur', async () => {
        const user = userEvent.setup();
        const onEditComplete = vi.fn();
        render(<EditableText name="title" value="same" onEditComplete={onEditComplete}/>);

        await user.click(screen.getByText('same'));
        await user.tab();

        expect(onEditComplete).not.toHaveBeenCalled();
    });

    it('cancels editing and reverts on Escape', async () => {
        const user = userEvent.setup();
        const onEditComplete = vi.fn();
        render(<EditableText name="title" value="old" onEditComplete={onEditComplete}/>);

        await user.click(screen.getByText('old'));
        const input = screen.getByRole('textbox');
        await user.clear(input);
        await user.type(input, 'changed{Escape}');

        expect(screen.getByText('old')).toBeInTheDocument();
        expect(onEditComplete).not.toHaveBeenCalled();
    });
});
