import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {CsvInput} from './CsvInput';

describe('CsvInput', () => {
    it('renders a default label when no label is provided', () => {
        render(<CsvInput name="file"/>);

        expect(screen.getByText('Upload CSV')).toBeInTheDocument();
    });

    it('renders a custom label and associates it with the file input', () => {
        render(<CsvInput name="file" label="Upload transactions"/>);

        const input = screen.getByLabelText('Upload transactions', {exact: false});
        expect(input).toHaveAttribute('type', 'file');
        expect(input).toHaveAttribute('accept', 'text/csv');
    });

    it('appends the required asterisk to the label when required', () => {
        render(<CsvInput name="file" label="Upload transactions" required/>);

        expect(screen.getByText('Upload transactions', {exact: false}).textContent)
            .toBe(' Upload transactions *');
    });

    it('shows a warning message when provided', () => {
        render(<CsvInput name="file" warningMessage="File too large"/>);

        expect(screen.getByText('File too large')).toBeInTheDocument();
    });

    it('shows a success message when provided', () => {
        render(<CsvInput name="file" successMessage="Upload complete"/>);

        expect(screen.getByText('Upload complete')).toBeInTheDocument();
    });

    it('calls handleOnChange with the selected file', async () => {
        const user = userEvent.setup();
        const handleOnChange = vi.fn();
        render(<CsvInput name="file" label="Upload transactions" handleOnChange={handleOnChange}/>);

        const file = new File(['a,b,c'], 'data.csv', {type: 'text/csv'});
        const input = screen.getByLabelText('Upload transactions', {exact: false});
        await user.upload(input, file);

        expect(handleOnChange).toHaveBeenCalledTimes(1);
        expect(handleOnChange).toHaveBeenCalledWith(file);
    });
});
