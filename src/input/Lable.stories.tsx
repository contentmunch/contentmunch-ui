import type {Meta, StoryObj} from '@storybook/react';
import {Label} from "./Label";

const meta: Meta<typeof Label> = {
    component: Label,
    title: 'Input/Label',
    render: (args) => <Label {...args}/>,
};

export default meta;
type Story = StoryObj<typeof Label>;
export const Default: Story = {
    args: {
        label: 'Item 1',
    }
};
