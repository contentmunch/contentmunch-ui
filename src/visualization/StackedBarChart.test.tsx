import {describe, expect, it} from 'vitest';
import {render} from '@testing-library/react';
import {StackedBarChart} from './StackedBarChart';
import type {StackedBarChartData} from './data/StackedBarChartData';

const baseData: StackedBarChartData = {
    titleField: 'Title',
    totalField: 'Total',
    stackFields: ['Renewal', 'New', 'Extension', 'Vacant'],
    values: [
        {Title: 'Scholars Rooftop', Renewal: 8, New: 5, Extension: 0, Vacant: 0, Total: 13},
        {Title: 'Scholars Rock', Renewal: 50, New: 44, Extension: 0, Vacant: 0, Total: 94},
        {Title: 'Huntington Gardens', Renewal: 25, New: 4, Extension: 0, Vacant: 4, Total: 33},
    ],
};

describe('StackedBarChart', () => {
    it('renders a container with a chart svg', () => {
        const {container} = render(<StackedBarChart data={baseData}/>);

        expect(container.querySelector('.muncher-bar-chart')).toBeInTheDocument();
        expect(container.querySelector('svg.svg-bar-chart')).toBeInTheDocument();
    });

    it('renders one bar rectangle per stack field per row', () => {
        const {container} = render(<StackedBarChart data={baseData}/>);

        const rects = container.querySelectorAll('rect.bar-rectangle');
        expect(rects).toHaveLength(baseData.values.length * baseData.stackFields.length);
    });

    it('renders an axis tick for each row title', () => {
        const {container} = render(<StackedBarChart data={baseData}/>);

        const tickTexts = Array.from(container.querySelectorAll('g.axis text')).map(t => t.textContent);
        baseData.values.forEach(v => {
            expect(tickTexts).toContain(v.Title as string);
        });
    });

    it('does not render a legend when withLegend is not set', () => {
        const {container} = render(<StackedBarChart data={baseData}/>);

        expect(container.querySelector('svg.svg-bar-chart-legend')).not.toBeInTheDocument();
    });

    it('renders a legend entry per stack field when withLegend is true', () => {
        const {container} = render(<StackedBarChart data={baseData} withLegend/>);

        const legend = container.querySelector('svg.svg-bar-chart-legend');
        expect(legend).toBeInTheDocument();
        expect(legend?.querySelectorAll('text')).toHaveLength(baseData.stackFields.length);
    });

    it('renders both x and y axes when showOnlyValues is not set', () => {
        const {container} = render(<StackedBarChart data={baseData}/>);

        expect(container.querySelectorAll('g.axis')).toHaveLength(2);
    });

    it('omits the value (x) axis when showOnlyValues is true', () => {
        const {container} = render(<StackedBarChart data={baseData} showOnlyValues/>);

        expect(container.querySelectorAll('g.axis')).toHaveLength(1);
    });

    it('applies custom colors from colorRange to the bar groups', () => {
        const colorRange = ['#111111', '#222222', '#333333', '#444444'];
        const {container} = render(<StackedBarChart data={baseData} colorRange={colorRange}/>);

        const groups = container.querySelectorAll('.svg-bar-chart g[fill]');
        const fills = Array.from(groups).map(g => g.getAttribute('fill'));
        colorRange.forEach(color => expect(fills).toContain(color));
    });

    it('renders no bars when values are empty', () => {
        const emptyData: StackedBarChartData = {...baseData, values: []};
        const {container} = render(<StackedBarChart data={emptyData}/>);

        expect(container.querySelectorAll('rect.bar-rectangle')).toHaveLength(0);
    });

    it('renders comparison bars alongside the base bars when comparisonData is provided', () => {
        const comparisonData: StackedBarChartData = {
            ...baseData,
            values: [
                {Title: 'Scholars Rooftop', Renewal: 5, New: 8, Extension: 0, Vacant: 0, Total: 13},
            ],
        };
        const singleRowData: StackedBarChartData = {...baseData, values: [baseData.values[0]]};

        const {container} = render(
            <StackedBarChart data={singleRowData} comparisonData={comparisonData}/>
        );

        const rects = container.querySelectorAll('rect.bar-rectangle');
        // 2 rows (base + comparison) x 4 stack fields
        expect(rects).toHaveLength(2 * baseData.stackFields.length);
    });

    it('renders percentage-formatted bar text when toPercentage is true', () => {
        const {container} = render(<StackedBarChart data={baseData} toPercentage/>);

        const barTexts = Array.from(container.querySelectorAll('text.bar-text')).map(t => t.textContent);
        const hasPercentText = barTexts.some(text => text && text.includes('%'));
        expect(hasPercentText).toBe(true);
    });
});
