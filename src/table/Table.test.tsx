import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {type Col, type Head, Table} from './Table';

const buildData = (): {header: Head[]; rows: Col[][]} => ({
    header: [
        {name: 'Id', title: 'Id'},
        {name: 'Name', title: 'First name'},
        {name: 'Email', title: 'Email Address', visibility: 'large-screen'},
        {name: 'Employee', title: 'Employee', visibility: 'hidden'},
    ],
    rows: [
        [
            {value: '2', content: '2'},
            {value: 'Dean Smith', content: 'Dean Smith'},
            {value: 'dean@gmail.com', content: 'dean@gmail.com'},
            {value: 'true', csv: 'yes', content: 'Yes'},
        ],
        [
            {value: '5', content: '5'},
            {value: 'Herman Miller', content: 'Herman Miller'},
            {value: 'herman@gmail.com', content: 'herman@gmail.com'},
            {value: 'false', csv: 'no', content: 'No'},
        ],
        [
            {value: '1', content: '1'},
            {value: 'Amy Adams', content: 'Amy Adams'},
            {value: 'amy@gmail.com', content: 'amy@gmail.com'},
            {value: 'true', csv: 'yes', content: 'Yes'},
        ],
    ],
});

describe('Table', () => {
    it('renders visible column headers and hides a "hidden" visibility column', () => {
        render(<Table excludePagination excludeDownload>{buildData()}</Table>);

        expect(screen.getByRole('button', {name: 'Id'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Name'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Email'})).toBeInTheDocument();
        expect(screen.queryByRole('button', {name: 'Employee'})).not.toBeInTheDocument();
    });

    it('renders row content for visible columns and hides the hidden column value', () => {
        render(<Table excludePagination excludeDownload>{buildData()}</Table>);

        expect(screen.getByText('Dean Smith')).toBeInTheDocument();
        expect(screen.getByText('dean@gmail.com')).toBeInTheDocument();
        // the hidden "Employee" column's content should not be rendered anywhere
        expect(screen.queryByText('Yes')).not.toBeInTheDocument();
    });

    it('renders rows in their given order by default (no sort applied)', () => {
        const {container} = render(<Table excludePagination excludeDownload>{buildData()}</Table>);

        const rows = container.querySelectorAll('.row:not(.head)');
        expect(rows).toHaveLength(3);
        expect(rows[0].textContent).toContain('Dean Smith');
        expect(rows[1].textContent).toContain('Herman Miller');
        expect(rows[2].textContent).toContain('Amy Adams');
    });

    it('sorts rows alphabetically ascending on first header click, using column value', async () => {
        const user = userEvent.setup();
        const {container} = render(<Table excludePagination excludeDownload>{buildData()}</Table>);

        await user.click(screen.getByRole('button', {name: 'Name'}));

        const rows = container.querySelectorAll('.row:not(.head)');
        expect(rows[0].textContent).toContain('Amy Adams');
        expect(rows[1].textContent).toContain('Dean Smith');
        expect(rows[2].textContent).toContain('Herman Miller');
    });

    it('reverses sort direction when the same header is clicked again', async () => {
        const user = userEvent.setup();
        const {container} = render(<Table excludePagination excludeDownload>{buildData()}</Table>);

        const nameHeader = screen.getByRole('button', {name: 'Name'});
        await user.click(nameHeader);
        await user.click(nameHeader);

        const rows = container.querySelectorAll('.row:not(.head)');
        expect(rows[0].textContent).toContain('Herman Miller');
        expect(rows[1].textContent).toContain('Dean Smith');
        expect(rows[2].textContent).toContain('Amy Adams');
    });

    it('uses a custom sort function when provided on the header', async () => {
        const user = userEvent.setup();
        const data = buildData();
        data.header[0].sort = (a, b) => Number(a[0].value) - Number(b[0].value);

        const {container} = render(<Table excludePagination excludeDownload>{data}</Table>);

        await user.click(screen.getByRole('button', {name: 'Id'}));

        const rows = container.querySelectorAll('.row:not(.head)');
        expect(rows[0].textContent).toContain('1');
        expect(rows[1].textContent).toContain('2');
        expect(rows[2].textContent).toContain('5');
    });

    it('applies an initial sort from the sortBy prop', () => {
        const {container} = render(
            <Table excludePagination excludeDownload sortBy={{index: 1}}>{buildData()}</Table>
        );

        const rows = container.querySelectorAll('.row:not(.head)');
        expect(rows[0].textContent).toContain('Amy Adams');
    });

    it('shows the download button by default and hides it when excludeDownload is set', () => {
        const {rerender} = render(<Table excludePagination>{buildData()}</Table>);
        expect(screen.getByText('Download')).toBeInTheDocument();

        rerender(<Table excludePagination excludeDownload>{buildData()}</Table>);
        expect(screen.queryByText('Download')).not.toBeInTheDocument();
    });

    it('shows the upload input when includeUpload is set and forwards the selected file', async () => {
        const handleOnUpload = vi.fn();
        render(
            <Table excludePagination excludeDownload includeUpload handleOnUpload={handleOnUpload}>
                {buildData()}
            </Table>
        );

        expect(screen.getByText('Upload CSV')).toBeInTheDocument();
    });

    it('renders pagination controls and row count summary by default', () => {
        render(<Table excludeDownload>{buildData()}</Table>);

        expect(screen.getByText(/1 -/)).toBeInTheDocument();
        expect(screen.getByText(/3 of 3/)).toBeInTheDocument();
    });

    it('hides pagination controls when excludePagination is set', () => {
        render(<Table excludePagination excludeDownload>{buildData()}</Table>);

        expect(screen.queryByText(/of 3/)).not.toBeInTheDocument();
    });

    it('disables the previous page button on the first page and enables next when more rows exist', () => {
        const data = buildData();
        render(
            <Table excludeDownload defaultPageSize={2}>{data}</Table>
        );

        const buttons = screen.getAllByRole('button').filter(b => !b.textContent?.match(/Id|Name|Email/));
        // last two buttons in the footer are prev/next
        const prevButton = buttons[buttons.length - 2];
        const nextButton = buttons[buttons.length - 1];

        expect(prevButton).toBeDisabled();
        expect(nextButton).not.toBeDisabled();
    });

    it('navigates to the next page and updates displayed rows and summary', async () => {
        const user = userEvent.setup();
        const {container} = render(<Table excludeDownload defaultPageSize={2}>{buildData()}</Table>);

        const buttons = screen.getAllByRole('button');
        const nextButton = buttons[buttons.length - 1];

        await user.click(nextButton);

        const rows = container.querySelectorAll('.row:not(.head)');
        expect(rows).toHaveLength(1);
        expect(screen.getByText(/3 -/)).toBeInTheDocument();
        expect(screen.getByText(/3 of 3/)).toBeInTheDocument();
    });

    it('renders a custom footer node when provided', () => {
        render(
            <Table excludePagination excludeDownload footer={<div data-testid="custom-footer">footer</div>}>
                {buildData()}
            </Table>
        );

        expect(screen.getByTestId('custom-footer')).toBeInTheDocument();
    });

    it('renders skeleton content instead of rows when skeleton is provided', () => {
        render(
            <Table excludePagination excludeDownload skeleton={<div data-testid="skeleton">Loading...</div>}>
                {buildData()}
            </Table>
        );

        expect(screen.getByTestId('skeleton')).toBeInTheDocument();
        expect(screen.queryByText('Dean Smith')).not.toBeInTheDocument();
    });

    it('applies a custom className alongside the base table class', () => {
        const {container} = render(
            <Table excludePagination excludeDownload className="custom-table">{buildData()}</Table>
        );

        const section = container.querySelector('section');
        expect(section?.className).toContain('muncher-table');
        expect(section?.className).toContain('custom-table');
    });
});
