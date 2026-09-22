import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Checkbox} from './Checkbox';

describe('Checkbox', () => {
    it('renders unchecked by default with an associated label', () => {
        render(<Checkbox name="muncher-checkbox" label="Item 1"/>);

        const checkbox = screen.getByLabelText('Item 1');
        expect(checkbox).toBeInstanceOf(HTMLInputElement);
        expect(checkbox).not.toBeChecked();
    });

    it('renders checked when checked is true', () => {
        render(<Checkbox name="muncher-checkbox" label="Item 1" checked/>);

        expect(screen.getByLabelText('Item 1')).toBeChecked();
    });

    it('renders without a label when label is not provided', () => {
        render(<Checkbox name="muncher-checkbox"/>);

        expect(screen.queryByRole('checkbox')).toBeInTheDocument();
        expect(screen.queryByText(/./)).not.toBeInTheDocument();
    });

    it('appends the required asterisk to the label when required', () => {
        render(<Checkbox name="muncher-checkbox" label="Item 1" required/>);

        expect(screen.getByText('Item 1', {exact: false}).textContent).toBe('Item 1*');
    });

    it('toggles checked state and fires onChange when the checkbox itself is clicked', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<Checkbox name="muncher-checkbox" label="Item 1" onChange={onChange}/>);

        const checkbox = screen.getByLabelText('Item 1');
        await user.click(checkbox);

        expect(checkbox).toBeChecked();
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('toggles checked state and fires onChange when the label text is clicked', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<Checkbox name="muncher-checkbox" label="Item 1" onChange={onChange}/>);

        const checkbox = screen.getByLabelText('Item 1');
        await user.click(screen.getByText('Item 1'));

        expect(checkbox).toBeChecked();
        expect(onChange).toHaveBeenCalledTimes(1);
    });
});
