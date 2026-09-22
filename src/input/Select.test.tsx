import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Select} from './Select';

const options = [
    {label: 'JavaScript', value: 'js'},
    {label: 'Python', value: 'py'},
    {label: 'Java', value: 'java'},
];

describe('Select', () => {
    it('renders a select element associated with its label and all options', () => {
        render(<Select name="select" label="select what" options={options} onChange={() => {}}/>);

        const select = screen.getByLabelText('select what', {exact: false});
        expect(select.tagName).toBe('SELECT');
        expect(screen.getByRole('option', {name: 'JavaScript'})).toBeInTheDocument();
        expect(screen.getByRole('option', {name: 'Python'})).toBeInTheDocument();
        expect(screen.getByRole('option', {name: 'Java'})).toBeInTheDocument();
    });

    it('shows a required asterisk on the label and a placeholder option when required', () => {
        render(<Select name="select" label="select what" options={options} required onChange={() => {}}/>);

        expect(screen.getByText('select what', {exact: false}).textContent).toBe('select what*');
        expect(screen.getByRole('option', {name: '-- Select --'})).toBeInTheDocument();
    });

    it('does not render the placeholder option when not required', () => {
        render(<Select name="select" label="select what" options={options} onChange={() => {}}/>);

        expect(screen.queryByRole('option', {name: '-- Select --'})).not.toBeInTheDocument();
    });

    it('supports the multiple attribute', () => {
        render(<Select name="select" label="select what" options={options} multiple onChange={() => {}}/>);

        expect(screen.getByLabelText('select what', {exact: false})).toHaveAttribute('multiple');
    });

    it('displays an error message and applies the error class when error is provided', () => {
        render(
            <Select name="select" label="select what" options={options} error="Provide value for select"
                    onChange={() => {}}/>
        );

        expect(screen.getByText('Provide value for select')).toBeInTheDocument();
        expect(screen.getByLabelText('select what', {exact: false}).className).toContain('muncher-input-error');
    });

    it('reflects the selected value', () => {
        render(<Select name="select" label="select what" options={options} value="py" onChange={() => {}}/>);

        expect(screen.getByLabelText('select what', {exact: false})).toHaveValue('py');
    });

    it('fires onChange when a different option is selected', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<Select name="select" label="select what" options={options} onChange={onChange}/>);

        await user.selectOptions(screen.getByLabelText('select what', {exact: false}), 'py');

        expect(onChange).toHaveBeenCalled();
    });
});
