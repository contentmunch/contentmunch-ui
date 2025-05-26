import type {Meta, StoryObj} from '@storybook/react';
import {Checkbox} from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
    component: Checkbox,
    title: 'Input/Checkbox',
    render: (args) => <Checkbox {...args}/>,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;
export const Default: Story = {
    args: {
        name: 'muncher-checkbox',
        label: 'Item 1',
    }
};
