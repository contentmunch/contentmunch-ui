import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';
import "./assets/input-story.css";
import {EditableText} from "./EditableText";

const meta: Meta<typeof EditableText> = {
    component: EditableText,
    title: 'Input/EditableText',
    decorators: [
        (Story) => (
            <div className="div-input-stories">
                <Story/>
            </div>)
    ],
    // wraps the story in local state so committing an edit is visible in the canvas,
    // since EditableText only shows a new value once its parent updates `value`.
    render: (args) => {
        const [value, setValue] = useState(args.value);
        return (
            <EditableText
                {...args}
                value={value}
                onEditComplete={(newValue) => {
                    setValue(newValue);
                    args.onEditComplete?.(newValue);
                }}
            />
        );
    },
};

export default meta;
type Story = StoryObj<typeof EditableText>;

export const Default: Story = {
    args: {
        name: "title",
        value: "Click to edit me",
        placeholder: "Type a value",
    }
};

export const Empty: Story = {
    args: {
        ...Default.args,
        value: "",
        emptyText: "No title set"
    }
};

export const WithLabel: Story = {
    args: {
        ...Default.args,
        label: 'Title',
        required: true,
    }
};

export const WithLabelOnTheSide: Story = {
    args: {
        ...WithLabel.args,
        label: 'Title of the page',
        labelPosition: 'side'
    }
};

export const WithIcon: Story = {
    args: {
        ...WithLabel.args,
        icon: "type"
    }
};

export const WithError: Story = {
    args: {
        ...WithIcon.args,
        error: "Title cannot be empty"
    }
};

export const WithInfo: Story = {
    args: {
        ...WithIcon.args,
        information: "This value is shown on the dashboard"
    }
};

export const ReadOnly: Story = {
    args: {
        ...Default.args,
        readOnly: true
    }
};

export const WithSpinner: Story = {
    args: {
        ...Default.args,
        displayLoader: true
    }
};

export const OnEditComplete: Story = {
    args: {
        ...Default.args,
        onEditComplete: (value: string) => {
            console.log("edit complete", value);
        }
    }
};
