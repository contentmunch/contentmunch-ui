import type {Meta, StoryObj} from "@storybook/react";
import type * as React from "react";
import {useState} from "react";
import {DonutChart} from "./DonutChart.tsx";
import {leaseTypes, occupancy, spending} from "./fixtures.ts";

const meta: Meta<typeof DonutChart> = { title: "Visualization/Donut", component: DonutChart, args: { data: spending } };
export default meta;
type Story = StoryObj<typeof DonutChart>;

export const Default: Story = {};
export const PinnedColors: Story = { args: { data: occupancy } };
export const NoTimeColumn: Story = { args: { data: leaseTypes } };
export const Small: Story = { args: { size: "small" } };
export const Large: Story = { args: { size: "large" } };
export const OtherPeriod: Story = { args: { period: "2026-09" } };

/** Balance's "Where it went": selecting a part shows it in the middle. */
const Interactive = (args: React.ComponentProps<typeof DonutChart>) => {
    const [selected, setSelected] = useState<string | null>("Groceries");
    return <DonutChart {...args} selected={selected} onSelect={setSelected}/>;
};
export const Selectable: Story = { render: (args) => <Interactive {...args}/> };
