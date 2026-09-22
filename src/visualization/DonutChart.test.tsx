import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {DonutChart} from './DonutChart';
import type {DonutChartData} from './data/DonutChartData';

const spending: DonutChartData[] = [
    {title: 'Groceries', value: 420},
    {title: 'Rent', value: 1500},
    {title: 'Utilities', value: 180},
];

describe('DonutChart', () => {
    it('renders the chart container and svg', () => {
        const {container} = render(<DonutChart data={spending}/>);

        expect(container.querySelector('.muncher-donut-chart')).toBeInTheDocument();
        expect(container.querySelector('svg.muncher-donut-chart-svg')).toBeInTheDocument();
    });

    it('renders one path per slice of data', () => {
        const {container} = render(<DonutChart data={spending}/>);

        const paths = container.querySelectorAll('path.muncher-donut-slice');
        expect(paths).toHaveLength(spending.length);
    });

    it('assigns default palette colors in data order when no color is given', () => {
        const {container} = render(<DonutChart data={spending}/>);

        const paths = container.querySelectorAll('path.muncher-donut-slice');
        expect(paths[0]).toHaveAttribute('fill', '#4e79a7');
        expect(paths[1]).toHaveAttribute('fill', '#59a14f');
        expect(paths[2]).toHaveAttribute('fill', '#f28e2c');
    });

    it('uses a data item color when provided, overriding the default palette', () => {
        const data: DonutChartData[] = [{title: 'Custom', value: 10, color: '#abcdef'}];
        const {container} = render(<DonutChart data={data}/>);

        expect(container.querySelector('path.muncher-donut-slice')).toHaveAttribute('fill', '#abcdef');
    });

    it('applies a custom colorRange palette', () => {
        const colorRange = ['#111111', '#222222', '#333333'];
        const {container} = render(<DonutChart data={spending} colorRange={colorRange}/>);

        const paths = container.querySelectorAll('path.muncher-donut-slice');
        expect(paths[0]).toHaveAttribute('fill', '#111111');
        expect(paths[1]).toHaveAttribute('fill', '#222222');
        expect(paths[2]).toHaveAttribute('fill', '#333333');
    });

    it('does not render a legend by default', () => {
        const {container} = render(<DonutChart data={spending}/>);

        expect(container.querySelector('.muncher-donut-chart-legend')).not.toBeInTheDocument();
    });

    it('renders a legend item per data entry when withLegend is set', () => {
        const {container} = render(<DonutChart data={spending} withLegend/>);

        const items = container.querySelectorAll('.muncher-donut-chart-legend-item');
        expect(items).toHaveLength(spending.length);
    });

    it('renders a legend title when both withLegend and legendTitle are set', () => {
        render(<DonutChart data={spending} withLegend legendTitle="Categories"/>);

        expect(screen.getByText('Categories')).toBeInTheDocument();
    });

    it('formats legend text with title and default (untransformed) value', () => {
        render(<DonutChart data={spending} withLegend/>);

        expect(screen.getByText('Groceries (420)')).toBeInTheDocument();
    });

    it('applies a custom value formatter to legend text', () => {
        render(<DonutChart data={spending} withLegend valueFormatter={(num) => `$${num}`}/>);

        expect(screen.getByText('Rent ($1500)')).toBeInTheDocument();
    });

    it('uses a data item legend override text when present', () => {
        const data: DonutChartData[] = [{title: 'Groceries', value: 420, legend: 'Food (420)'}];
        render(<DonutChart data={data} withLegend/>);

        expect(screen.getByText('Food (420)')).toBeInTheDocument();
    });

    it('marks the selected slice and legend item with is-selected', () => {
        const {container} = render(<DonutChart data={spending} withLegend selected="Rent"/>);

        const paths = container.querySelectorAll('path.muncher-donut-slice');
        expect(paths[1]).toHaveClass('is-selected');
        expect(paths[0]).not.toHaveClass('is-selected');

        const legendItems = container.querySelectorAll('.muncher-donut-chart-legend-item');
        expect(legendItems[1]).toHaveClass('is-selected');
    });

    it('calls onSelect with the slice title when a slice is clicked', async () => {
        const user = userEvent.setup();
        const onSelect = vi.fn();
        const {container} = render(<DonutChart data={spending} onSelect={onSelect}/>);

        const paths = container.querySelectorAll('path.muncher-donut-slice');
        await user.click(paths[2]);

        expect(onSelect).toHaveBeenCalledWith('Utilities');
    });

    it('calls onSelect with the slice title when a legend item is clicked', async () => {
        const user = userEvent.setup();
        const onSelect = vi.fn();
        const {container} = render(<DonutChart data={spending} withLegend onSelect={onSelect}/>);

        const items = container.querySelectorAll('.muncher-donut-chart-legend-item');
        await user.click(items[0]);

        expect(onSelect).toHaveBeenCalledWith('Groceries');
    });

    it('renders center label and value when provided', () => {
        render(<DonutChart data={spending} centerLabel="Total spent" centerValue="$2,100"/>);

        expect(screen.getByText('Total spent')).toBeInTheDocument();
        expect(screen.getByText('$2,100')).toBeInTheDocument();
    });

    it('does not render the center block when neither label nor value are provided', () => {
        const {container} = render(<DonutChart data={spending}/>);

        expect(container.querySelector('.muncher-donut-chart-center')).not.toBeInTheDocument();
    });

    it('applies the given size to the graphic container and viewBox', () => {
        const {container} = render(<DonutChart data={spending} size={120}/>);

        const graphic = container.querySelector('.muncher-donut-chart-graphic') as HTMLElement;
        expect(graphic.style.width).toBe('120px');
        expect(graphic.style.height).toBe('120px');

        const svg = container.querySelector('svg.muncher-donut-chart-svg');
        expect(svg).toHaveAttribute('viewBox', '0 0 120 120');
    });

    it('renders no slices for empty data', () => {
        const {container} = render(<DonutChart data={[]}/>);

        expect(container.querySelectorAll('path.muncher-donut-slice')).toHaveLength(0);
    });

    it('renders a single full slice for single-item data', () => {
        const {container} = render(<DonutChart data={[{title: 'Everything', value: 100}]}/>);

        const paths = container.querySelectorAll('path.muncher-donut-slice');
        expect(paths).toHaveLength(1);
    });

    it('renders no slices when all values sum to zero', () => {
        const {container} = render(
            <DonutChart data={[{title: 'A', value: 0}, {title: 'B', value: 0}]}/>
        );

        expect(container.querySelectorAll('path.muncher-donut-slice')).toHaveLength(0);
    });
});
