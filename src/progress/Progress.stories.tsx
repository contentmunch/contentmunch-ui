import type {Meta, StoryObj} from '@storybook/react';
import {Progress} from "./Progress";

const meta: Meta<typeof Progress> = {
    component: Progress,
    title: 'Feedback/Progress',
    render: (args) => <Progress {...args}/>,
};

export default meta;
type Story = StoryObj<typeof Progress>;
export const Default: Story = {
    args: {
        max: 100,
        value: 30,
        label: "Progress: "
    }
};
