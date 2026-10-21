import type {Meta, StoryObj} from "@storybook/react";
import {TableChart} from "./TableChart.tsx";
import {comparison, leasesByProperty, spending} from "./fixtures.ts";

const meta: Meta<typeof TableChart> = { title: "Visualization/Table", component: TableChart, args: { data: leasesByProperty } };
export default meta;
type Story = StoryObj<typeof TableChart>;

export const Counts: Story = {};
export const WithAPeriodAndCurrency: Story = { args: { data: spending } };
export const TwoCategories: Story = { args: { data: comparison } };
