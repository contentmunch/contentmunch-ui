import type {Meta, StoryObj} from "@storybook/react";
import {KpiChart} from "./KpiChart.tsx";
import {monthlyRevenue} from "./fixtures.ts";

const meta: Meta<typeof KpiChart> = { title: "Visualization/KPI", component: KpiChart, args: { data: monthlyRevenue } };
export default meta;
type Story = StoryObj<typeof KpiChart>;

export const Latest: Story = {};
export const AnEarlierPeriod: Story = { args: { period: "2026-06" } };
export const FirstPeriod: Story = { args: { period: "2026-03" } };
export const Small: Story = { args: { size: "small" } };
export const Large: Story = { args: { size: "large" } };
