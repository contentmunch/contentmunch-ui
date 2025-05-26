import type {Meta, StoryObj} from '@storybook/react';
import {CsvButton} from "./CsvButton";

const meta: Meta<typeof CsvButton> = {
    component: CsvButton,
    title: 'Buttons/CSV Button',
    render: (args) => <CsvButton {...args}>Button</CsvButton>,
};

export default meta;
type Story = StoryObj<typeof CsvButton>;
export const Default: Story = {
    args: {
        title: 'Download Csv',
        variant: 'secondary',
        header: ['Name', 'Email'],
        filename: 'download',
        data: [
            ['Sam Jackson', 'sam@gmail.com'],
            ['Bob Levy', 'levy_bob@gmail.com']
        ]
    }
};
