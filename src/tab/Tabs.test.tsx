import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Tabs} from './Tabs';

const buildTabs = () => ({
    tabs: [
        {header: 'First', headerTitle: 'First tab', body: <p>First body</p>},
        {header: 'Second', body: <p>Second body</p>},
        {header: 'Third', body: <p>Third body</p>},
    ],
});

describe('Tabs', () => {
    it('renders all tab headers and shows the first tab as active by default', () => {
        render(<Tabs>{buildTabs()}</Tabs>);

        expect(screen.getByRole('button', {name: 'First'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Second'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Third'})).toBeInTheDocument();

        expect(screen.getByText('First body')).toBeInTheDocument();
        expect(screen.getByText('Second body')).toBeInTheDocument();
        expect(screen.getByText('Third body')).toBeInTheDocument();

        expect(screen.getByRole('button', {name: 'First'}).className).toContain('muncher-button--active');
    });

    it('applies the headerTitle as the button title attribute', () => {
        render(<Tabs>{buildTabs()}</Tabs>);

        expect(screen.getByRole('button', {name: 'First'})).toHaveAttribute('title', 'First tab');
    });

    it('renders a spacer between headers but not after the last one', () => {
        const {container} = render(<Tabs>{buildTabs()}</Tabs>);

        expect(container.querySelectorAll('.spacer')).toHaveLength(2);
    });

    it('switches the active tab section when a different header is clicked', async () => {
        const user = userEvent.setup();
        const {container} = render(<Tabs>{buildTabs()}</Tabs>);

        await user.click(screen.getByRole('button', {name: 'Second'}));

        expect(screen.getByRole('button', {name: 'Second'}).className).toContain('muncher-button--active');
        expect(screen.getByRole('button', {name: 'First'}).className).not.toContain('muncher-button--active');

        const sections = container.querySelectorAll('section.muncher-tab');
        expect(sections[1].className).toContain('muncher-tab--active');
        expect(sections[0].className).not.toContain('muncher-tab--active');
    });

    it('calls handleTabSelected with the new index when a tab is clicked', async () => {
        const user = userEvent.setup();
        const handleTabSelected = vi.fn();
        render(<Tabs handleTabSelected={handleTabSelected}>{buildTabs()}</Tabs>);

        await user.click(screen.getByRole('button', {name: 'Third'}));

        expect(handleTabSelected).toHaveBeenCalledTimes(1);
        expect(handleTabSelected).toHaveBeenCalledWith(2);
    });

    it('does not throw when handleTabSelected is not provided', async () => {
        const user = userEvent.setup();
        render(<Tabs>{buildTabs()}</Tabs>);

        await user.click(screen.getByRole('button', {name: 'Second'}));

        expect(screen.getByText('Second body')).toBeInTheDocument();
    });
});
