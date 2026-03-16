import type {Meta, StoryObj} from '@storybook/react';
import {Step} from "./Step";

const meta: Meta<typeof Step> = {
    component: Step,
    title: 'Data Display/Step',
    render: (args) => <Step {...args}>1</Step>,
};

export default meta;
type Story = StoryObj<typeof Step>;
export const ActiveStep: Story = {
    args: {
        active: true
    }
}
export const StepWithLabel: Story = {
    args: {
        active: true,
        label: "You are here"
    }
}
export const InactiveStep: Story = {
    args: {

    }
}

