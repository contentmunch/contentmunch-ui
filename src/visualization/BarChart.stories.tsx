import type {Meta, StoryObj} from "@storybook/react";
import {BarChart} from "./BarChart.tsx";
import {comparison, leaseMix, leasesByProperty, twoMonths} from "./fixtures.ts";

const meta: Meta<typeof BarChart> = { title: "Visualization/Bar", component: BarChart, args: { data: leasesByProperty } };
export default meta;
type Story = StoryObj<typeof BarChart>;

export const Stacked: Story = {};
export const ScaledToShares: Story = { args: { data: leaseMix } };
/** The signed-date comparison report: two dates of each property side by side, each stacked by type. */
export const Comparison: Story = { args: { data: comparison } };
export const TwoPeriods: Story = { args: { data: twoMonths } };
export const Small: Story = { args: { size: "small" } };
export const Large: Story = { args: { size: "large" } };
export const BadData: Story = { args: { data: { ...leasesByProperty, rows: [{ property: "Harbour", New: -1, Renewal: 2, Extension: 1, Vacant: 0 }] } } };
export const Empty: Story = { args: { data: { ...leasesByProperty, rows: [] } } };
