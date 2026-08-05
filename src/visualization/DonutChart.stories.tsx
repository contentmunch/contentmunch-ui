import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';
import {DonutChart} from "./DonutChart";
import type {DonutChartData} from "./data/DonutChartData.ts";

const spending: DonutChartData[] = [
    {title: "Groceries", value: 420},
    {title: "Rent", value: 1500},
    {title: "Utilities", value: 180},
    {title: "Dining out", value: 260},
    {title: "Transport", value: 140},
];

const meta: Meta<typeof DonutChart> = {
    component: DonutChart,
    title: 'Visualization/DonutChart',
    decorators: [
        (Story) => (
            <div className="div-input-stories">
                <Story/>
            </div>)
    ],
    // keeps `selected` in local state so clicking a slice or legend row is
    // visible in the canvas, since DonutChart is controlled and won't
    // update its own selection.
    render: (args) => {
        const [selected, setSelected] = useState(args.selected ?? null);
        return (
            <DonutChart
                {...args}
                selected={selected}
                onSelect={title => {
                    setSelected(title === selected ? null : title);
                    args.onSelect?.(title);
                }}
            />
        );
    },
};

export default meta;
type Story = StoryObj<typeof DonutChart>;

export const Default: Story = {
    args: {
        data: spending,
    }
};

export const WithSelection: Story = {
    args: {
        ...Default.args,
        selected: "Rent",
    }
};

export const WithCenterLabel: Story = {
    args: {
        ...Default.args,
        centerLabel: "Total spent",
        centerValue: "$2,500",
    }
};

export const WithLegend: Story = {
    args: {
        ...Default.args,
        centerLabel: "Total spent",
        centerValue: "$2,500",
        withLegend: true,
        legendTitle: "Categories",
    }
};

export const CustomColors: Story = {
    args: {
        ...Default.args,
        colorRange: ["#13294b", "#bba035", "#8a9a5b", "#c65d4a", "#5b7c99"],
        withLegend: true,
    }
};

export const CustomFormatter: Story = {
    args: {
        ...Default.args,
        centerLabel: "Total spent",
        centerValue: "$2,500",
        withLegend: true,
        valueFormatter: (num) => `$${num.toLocaleString()}`,
    }
};

export const SmallSize: Story = {
    args: {
        ...Default.args,
        size: 120,
        centerLabel: "Total",
        centerValue: "$2,500",
    }
};

export const SingleSlice: Story = {
    args: {
        data: [{title: "Everything", value: 100}],
        centerLabel: "Total spent",
        centerValue: "$2,500",
    }
};

export const OnSelect: Story = {
    args: {
        ...Default.args,
        onSelect: (title) => {
            console.log("selected", title);
        }
    }
};
