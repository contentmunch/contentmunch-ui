import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Radio} from './Radio';

describe('Radio', () => {
    it('renders a radio input with its label', () => {
        render(<Radio name="question" label="Option A"/>);

        const radio = screen.getByRole('radio');
        expect(radio).toHaveAttribute('name', 'question');
        expect(screen.getByText('Option A')).toBeInTheDocument();
    });

    it('renders without a label when none is provided', () => {
        render(<Radio name="question"/>);

        expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    it('shows a required asterisk on the label when required', () => {
        render(<Radio name="question" label="Option A" required/>);

        const label = screen.getByText('Option A', {exact: false});
        expect(label.textContent).toBe('Option A*');
    });

    it('does not show an asterisk when not required', () => {
        render(<Radio name="question" label="Option A"/>);

        const label = screen.getByText('Option A', {exact: false});
        expect(label.textContent).toBe('Option A');
    });

    it('reflects the checked prop', () => {
        render(<Radio name="question" label="Option A" checked/>);

        expect(screen.getByRole('radio')).toBeChecked();
    });

    it('is unchecked by default', () => {
        render(<Radio name="question" label="Option A"/>);

        expect(screen.getByRole('radio')).not.toBeChecked();
    });

    it('fires onChange when the radio input is clicked', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<Radio name="question" label="Option A" onChange={onChange}/>);

        await user.click(screen.getByRole('radio'));

        expect(onChange).toHaveBeenCalled();
    });

    it('fires onChange when the label is clicked', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<Radio name="question" label="Option A" onChange={onChange}/>);

        await user.click(screen.getByText('Option A'));

        expect(onChange).toHaveBeenCalledTimes(1);
    });
});
