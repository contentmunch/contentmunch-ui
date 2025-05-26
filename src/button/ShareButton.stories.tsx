import type {Meta, StoryObj} from '@storybook/react';
import {ShareButton} from "./ShareButton";

const meta: Meta<typeof ShareButton> = {
    component: ShareButton,
    title: 'Buttons/Share Button',
    render: (args) => <ShareButton {...args}/>,
};

export default meta;
type Story = StoryObj<typeof ShareButton>;
export const Default: Story = {
    args: {
        title: "Check out this apartment"
    }
};
