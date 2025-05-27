import type {Meta, StoryObj} from '@storybook/react';
import {Hr} from "./Hr.tsx";

const meta: Meta<typeof Hr> = {
    component: Hr,
    title: 'Rule/Horizontal Rule',
    render: (args) => <Hr {...args}/>,
};

export default meta;
type Story = StoryObj<typeof Hr>;
export const Default: Story = {
    args: {}
};
export const Secondary: Story = {
    args: {
        variant: 'secondary'
    }
};
export const Dotted: Story = {
    args: {
        style: 'dotted'
    }
};
export const Dashed: Story = {
    args: {
        style: 'dashed'
    }
};
export const Solid: Story = {
    args: {
        style: 'sold'
    }
};
