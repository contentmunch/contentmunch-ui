import type {Meta, StoryObj} from '@storybook/react';
import {CopyButton} from "./CopyButton";

const meta: Meta<typeof CopyButton> = {
    component: CopyButton,
    title: 'Buttons/Copy Button',
    render: (args) => <CopyButton {...args}/>,
};

export default meta;
type Story = StoryObj<typeof CopyButton>;
export const Default: Story = {
    args: {
        text: "This is the text from clipboard"
    }
};
