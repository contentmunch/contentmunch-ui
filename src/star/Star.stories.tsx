import type {Meta, StoryObj} from '@storybook/react';
import {Star} from "./Star";

const meta: Meta<typeof Star> = {
    component: Star,
    title: 'Utils/Star',
    render: (args) => <Star {...args}/>,
};

export default meta;
type Story = StoryObj<typeof Star>;
export const Default: Story = {
    args: {
        rating: 3.4
    }
};

export const Small: Story = {
    args: {
        ...Default.args,
        size: 'small'
    }
};

export const Medium: Story = {
    args: {
        ...Default.args,
        size: 'medium'
    }
};

export const Green: Story = {
    args: {
        ...Default.args,
        color: 'green'
    }
};

