import type {Meta, StoryObj} from '@storybook/react';
import {Button} from "./Button";

const meta: Meta<typeof Button> = {
    component: Button,
    title: 'Buttons/Button',
    render: (args) => <Button {...args}>Button</Button>,
};

export default meta;
type Story = StoryObj<typeof Button>;
export const Default: Story = {
    args: {
        title: 'Default Button'
    }
};
export const NavButton: Story = {
    args: {
        title: 'Nav Button',
        type: 'nav',
    }
};
export const Secondary: Story = {
    args: {
        title: 'Secondary Button',
        variant: 'secondary'
    }
};
export const Tertiary: Story = {
    args: {
        title: 'Tertiary Button',
        variant: 'tertiary'
    }
};
