import type {Meta, StoryObj} from "@storybook/react";
import type * as React from "react";
import {useState} from "react";
import {PieChart} from "./PieChart.tsx";
import {leaseTypes, occupancy, spending} from "./fixtures.ts";

const meta: Meta<typeof PieChart> = { title: "Visualization/Pie", component: PieChart, args: { data: leaseTypes } };
export default meta;
type Story = StoryObj<typeof PieChart>;

export const Default: Story = {};
export const PinnedColors: Story = { args: { data: occupancy } };
export const GroupsTheTailIntoOther: Story = { args: { data: spending } };
export const Small: Story = { args: { size: "small" } };
export const Large: Story = { args: { size: "large" } };
export const OtherPeriod: Story = { args: { data: spending, period: "2026-09" } };

const Interactive = (args: React.ComponentProps<typeof PieChart>) => {
    const [selected, setSelected] = useState<string | null>("New");
    return <PieChart {...args} selected={selected} onSelect={setSelected}/>;
};
export const Selectable: Story = { render: (args) => <Interactive {...args}/> };

export const BadData: Story = { args: { data: { ...leaseTypes, rows: [{ type: "Renewal", leases: -4 }] } } };
export const Empty: Story = { args: { data: { ...leaseTypes, rows: [] } } };
