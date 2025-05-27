import type {Meta, StoryObj} from '@storybook/react';
import {Featured} from "./Featured";

const meta: Meta<typeof Featured> = {
    component: Featured,
    title: 'Utils/Star/Featured',
    render: (args) => <Featured {...args}/>,
};

export default meta;
type Story = StoryObj<typeof Featured>;
export const Default: Story = {
    args: {
        isFeatured: true,
        onClick: () => {
            console.log("clicked");
        }
    }
};
export const UnFeatured: Story = {
    args: {
        isFeatured: false,
        onClick: () => {
            console.log("clicked");
        }
    }
};
