import type {Meta, StoryObj} from '@storybook/react';
import {Textarea} from "./Textarea";

const meta: Meta<typeof Textarea> = {
    component: Textarea,
    title: 'Input/Textarea',
    render: (args) => <Textarea {...args}/>,
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
    args: {
        name: "question",
        placeholder: "Type your question"
    }
};

export const WithLabel: Story = {
    args: {
        name: "question",
        label: "Your question",
        placeholder: "Type your question"
    }
};

export const Required: Story = {
    args: {
        name: "question",
        label: "Your question",
        placeholder: "Type your question",
        required: true
    }
};

export const Prefilled: Story = {
    args: {
        name: "question",
        label: "Your question",
        value: "This textarea already has some content in it."
    }
};

export const ReadOnly: Story = {
    args: {
        name: "question",
        label: "Your question",
        value: "This field can't be edited.",
        readOnly: true
    }
};

export const WithoutCharacterCount: Story = {
    args: {
        name: "question",
        label: "Your question",
        placeholder: "No counter shown below this field",
        showCount: false
    }
};

export const CustomMaxLength: Story = {
    args: {
        name: "tweet",
        label: "Short answer",
        placeholder: "Keep it brief",
        maxLength: 140
    }
};

export const CustomRows: Story = {
    args: {
        name: "story",
        label: "Tell us your story",
        placeholder: "Take your time...",
        rows: 12
    }
};

export const AutoFocused: Story = {
    args: {
        name: "question",
        label: "Your question",
        placeholder: "This field is focused on load",
        focus: true
    }
};

export const NearLimit: Story = {
    args: {
        name: "question",
        label: "Your question",
        value: "x".repeat(980),
        maxLength: 1000
    }
};
