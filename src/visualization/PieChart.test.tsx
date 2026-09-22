import {describe, expect, it, vi} from 'vitest';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {PieChart} from './PieChart';
import type {PieChartData} from './data/PieChartData';

const sampleData: PieChartData[] = [
    {title: 'First', value: 60, isSelected: true, legend: 'First (23: 60%)'},
    {title: 'Second', value: 1, isSelected: false},
    {title: 'Third', value: 5, isSelected: false},
];

describe('PieChart', () => {
    it('renders a container with a chart svg', () => {
        const {container} = render(<PieChart data={sampleData}/>);

        expect(container.querySelector('.muncher-pie-chart')).toBeInTheDocument();
        expect(container.querySelector('svg.svg-pie-chart')).toBeInTheDocument();
    });

    it('renders one path per data slice', () => {
        const {container} = render(<PieChart data={sampleData}/>);

        const paths = container.querySelectorAll('svg.svg-pie-chart path');
        expect(paths).toHaveLength(sampleData.length);
    });

    it('marks the selected slice with the "selected" class', () => {
        const {container} = render(<PieChart data={sampleData}/>);

        const paths = container.querySelectorAll('svg.svg-pie-chart path');
        expect(paths[0]).toHaveClass('selected');
        expect(paths[1]).not.toHaveClass('selected');
        expect(paths[2]).not.toHaveClass('selected');
    });

    it('does not render a legend when withLegend is not set', () => {
        const {container} = render(<PieChart data={sampleData}/>);

        expect(container.querySelector('svg.svg-pie-chart-legend')).not.toBeInTheDocument();
    });

    it('renders a legend entry per data item when withLegend is true', () => {
        const {container} = render(<PieChart data={sampleData} withLegend/>);

        const legend = container.querySelector('svg.svg-pie-chart-legend');
        expect(legend).toBeInTheDocument();
        expect(legend?.querySelectorAll('.legend-text')).toHaveLength(sampleData.length);
        expect(legend?.querySelectorAll('.legend-rect')).toHaveLength(sampleData.length);
    });

    it('uses a custom legend title when provided', () => {
        const {container} = render(<PieChart data={sampleData} withLegend legendTitle="My Legend"/>);

        expect(container.querySelector('.legend-title')?.textContent).toBe('My Legend');
    });

    it('defaults the legend title to "Legend" when not provided', () => {
        const {container} = render(<PieChart data={sampleData} withLegend/>);

        expect(container.querySelector('.legend-title')?.textContent).toBe('Legend');
    });

    it('uses the provided legend text when set on the data item', () => {
        const {container} = render(<PieChart data={sampleData} withLegend/>);

        const legendTexts = container.querySelectorAll('.legend-text');
        expect(legendTexts[0].textContent).toBe('First (23: 60%)');
    });

    it('falls back to title + formatted value when legend text is not provided', () => {
        const {container} = render(<PieChart data={sampleData} withLegend/>);

        const legendTexts = container.querySelectorAll('.legend-text');
        expect(legendTexts[1].textContent).toBe('Second (1)');
    });

    it('applies a custom value formatter to the legend text', () => {
        const {container} = render(
            <PieChart data={sampleData} withLegend valueFormatter={(num) => `${num}%`}/>
        );

        const legendTexts = container.querySelectorAll('.legend-text');
        expect(legendTexts[1].textContent).toBe('Second (1%)');
    });

    it('applies custom colors from colorRange', () => {
        // Note: the component seeds the d3 ordinal scale's domain with only
        // the alphabetical min/max title (via d3.extent), so colors are not
        // simply assigned in data order -- every slice still gets a distinct
        // color from the given range, just not index-for-index.
        const colorRange = ['#111111', '#222222', '#333333'];
        const {container} = render(<PieChart data={sampleData} colorRange={colorRange}/>);

        const paths = container.querySelectorAll('svg.svg-pie-chart path');
        const fills = Array.from(paths).map(p => p.getAttribute('fill'));
        expect(fills).toHaveLength(3);
        expect(new Set(fills).size).toBe(3);
        fills.forEach(fill => expect(colorRange).toContain(fill));
    });

    it('calls onClick with the clicked slice index when a path is clicked', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        const {container} = render(<PieChart data={sampleData} onClick={onClick}/>);

        const paths = container.querySelectorAll('svg.svg-pie-chart path');
        await user.click(paths[1]);

        expect(onClick).toHaveBeenCalledWith(1);
    });

    it('calls onClick when a legend entry is clicked', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        const {container} = render(<PieChart data={sampleData} withLegend onClick={onClick}/>);

        const legendTexts = container.querySelectorAll('.legend-text');
        await user.click(legendTexts[2]);

        expect(onClick).toHaveBeenCalledWith(2);
    });

    it('renders without a legend and without crashing when data is empty', () => {
        const {container} = render(<PieChart data={[]}/>);

        const paths = container.querySelectorAll('svg.svg-pie-chart path');
        expect(paths).toHaveLength(0);
    });

    it('renders an empty legend list when data is empty but withLegend is true', () => {
        const {container} = render(<PieChart data={[]} withLegend/>);

        expect(container.querySelectorAll('.legend-text')).toHaveLength(0);
        expect(container.querySelector('.legend-title')).toBeInTheDocument();
    });
});
