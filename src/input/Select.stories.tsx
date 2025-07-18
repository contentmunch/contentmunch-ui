import type {Meta, StoryObj} from '@storybook/react';
import {Select} from "./Select";

const meta: Meta<typeof Select> = {
    component: Select,
    title: 'Input/Select',
    render: (args) => <Select {...args}/>,
};

export default meta;
type Story = StoryObj<typeof Select>;
export const Default: Story = {
    args: {
        name: "select",
        label: "select what",
        required: true,
        options: [
            { label: "JavaScript", value: "js" },
            { label: "Python", value: "py" },
            { label: "Java", value: "java" }
        ],
        onChange: (e) => {
            console.log(e.target.value);
        }
    }
};


export const Multiple: Story = {
    args: {
        ...Default.args,
        multiple: true
    }
};

export const WithError: Story = {
    args: {
        ...Default.args,
        error: "Provide value for select"
    }
};

export const WithValue: Story = {
    args: {
        ...Default.args,
        value: "py"
    }
};
