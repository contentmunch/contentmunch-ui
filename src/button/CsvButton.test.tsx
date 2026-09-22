import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {CsvButton} from './CsvButton';

const header = ['Name', 'Email'];
const data = [
    ['Sam Jackson', 'sam@gmail.com'],
    ['Bob Levy', 'levy_bob@gmail.com'],
];

describe('CsvButton', () => {
    it('renders a download link with the default "Download" title', () => {
        render(<CsvButton header={header} data={data} filename="download"/>);

        expect(screen.getByText('Download')).toBeInTheDocument();
    });

    it('renders a custom title when provided', () => {
        render(<CsvButton header={header} data={data} filename="download" title="Download Csv"/>);

        expect(screen.getByText('Download Csv')).toBeInTheDocument();
        expect(screen.queryByText('Download')).not.toBeInTheDocument();
    });

    it('builds a data: URI containing the encoded header and rows, with the filename suffixed with .csv', () => {
        render(<CsvButton header={header} data={data} filename="download"/>);

        const link = screen.getByText('Download').closest('a') as HTMLAnchorElement;
        expect(link).toHaveAttribute('download', 'download.csv');
        expect(link.getAttribute('href')).toContain(encodeURI('Name,Email'));
        expect(link.getAttribute('href')).toContain(encodeURI('Sam Jackson,sam@gmail.com'));
        expect(link.getAttribute('href')).toContain(encodeURI('Bob Levy,levy_bob@gmail.com'));
        expect(link.getAttribute('href')?.startsWith('data:text/csv;charset=utf-8,')).toBe(true);
    });

    it('applies variant, size, active, disabled and rounded to the underlying button', () => {
        render(
            <CsvButton header={header} data={data} filename="download" variant="secondary" size="large"
                       active rounded disabled/>
        );

        const button = screen.getByRole('button');
        expect(button.className).toContain('muncher-button--secondary');
        expect(button.className).toContain('muncher-button--large');
        expect(button.className).toContain('muncher-button--active');
        expect(button.className).toContain('muncher-button--rounded');
        expect(button).toBeDisabled();
    });
});
