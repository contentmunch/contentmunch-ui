import type {Meta, StoryObj} from '@storybook/react';
import type {Label} from "../input/Label.tsx";

const meta: Meta<typeof Label> = {
    title: 'Utils/DataTitle',
    render: (args) => <a href='#home' {...args}>Hover here</a>,
};

export default meta;
type Story = StoryObj;
export const Default: Story = {
    args: {
        'data-title': 'This will show up on hover'
    }
};
