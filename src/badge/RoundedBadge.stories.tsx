import type {Meta, StoryObj} from '@storybook/react';
import {Badge} from "./Badge";

const meta: Meta<typeof Badge> = {
    component: Badge,
    title: 'Data Display/Badge',
    render: (args) => <Badge {...args}>1</Badge>,
};

export default meta;
type Story = StoryObj<typeof Badge>;
export const Rounded: Story = {
    args: {
        variant: 'primary',
        rounded: true
    }
}

export const Bordered: Story = {
    args: {
        variant: 'transparent',
        rounded: true,
        border: true
    }
}
