import type {Meta, StoryObj} from '@storybook/react';
import {SortButton} from "./SortButton";

const meta: Meta<typeof SortButton> = {
    component: SortButton,
    title: 'Buttons/Sort Button',
    render: (args) => <SortButton {...args} >Button</SortButton>
};

export default meta;
type Story = StoryObj<typeof SortButton>;
export const Default: Story = {
    args: {
        title: 'Sort Button',
    }
};

export const Active: Story = {
    args: {
        ...Default.args,
        active: true
    }
}
