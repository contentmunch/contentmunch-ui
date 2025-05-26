import type {Meta, StoryObj} from '@storybook/react';
import {Spinner} from "./Spinner";

const meta: Meta<typeof Spinner> = {
    component: Spinner,
    title: 'Utils/Spinner',
    render: (args) => <Spinner {...args}/>,
};

export default meta;
type Story = StoryObj<typeof Spinner>;
export const Default: Story = {
    args: {}
};
