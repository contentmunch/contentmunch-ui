import type {Meta, StoryObj} from "@storybook/react";
import {LineChart} from "./LineChart.tsx";
import {funnelByMonth, monthlyRevenue, regionsByMonth} from "./fixtures.ts";

const meta: Meta<typeof LineChart> = { title: "Visualization/Line", component: LineChart, args: { data: monthlyRevenue } };
export default meta;
type Story = StoryObj<typeof LineChart>;

export const OneMeasure: Story = {};
export const SeveralMeasures: Story = { args: { data: funnelByMonth } };
export const OneLinePerCategory: Story = { args: { data: regionsByMonth } };
/** A month with no data is a gap in the line, not skipped. */
export const WithAGap: Story = { args: { data: { ...monthlyRevenue, rows: monthlyRevenue.rows.filter((r) => r.month !== "2026-06") } } };
export const Small: Story = { args: { size: "small" } };
export const Large: Story = { args: { size: "large" } };
export const NeedsATimeColumn: Story = { args: { data: { ...monthlyRevenue, columns: [monthlyRevenue.columns[1]] } } };
