import type {Meta, StoryObj} from '@storybook/react';
import {Radio} from "./Radio";

const meta: Meta<typeof Radio> = {
    component: Radio,
    title: 'Input/Radio',
    render: (args) => <Radio {...args}/>,
};

export default meta;
type Story = StoryObj<typeof Radio>;
export const Default: Story = {
    args: {
        name: 'muncher-radio',
        label: 'radio',
    }
};
