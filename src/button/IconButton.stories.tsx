import type {Meta, StoryObj} from '@storybook/react';
import {Button} from "./Button";
import {Icon} from "../icon/Icon";

const meta: Meta<typeof Button> = {
    component: Button,
    title: 'Buttons/Icon Button',
    render: (args) => <Button {...args}><Icon name='muncher'/></Button>,
};

export default meta;
type Story = StoryObj<typeof Button>;
export const IconButton: Story = {
    args: {
        title: 'Icon Button',
        size: 'small'
    }
};

export const TransparentButton: Story = {
    args: {
        title: 'Transparent Button',
        size: 'small',
        variant: "transparent",
    }
}
export const RoundedButton: Story = {
    args: {
        ...IconButton.args,
        title: 'Rounded Button',
        variant: 'secondary',
        rounded: true,
    }
}
