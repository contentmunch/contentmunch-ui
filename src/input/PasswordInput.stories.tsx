import type {Meta, StoryObj} from '@storybook/react';
import "./assets/input-story.css";
import {PasswordInput} from "./PasswordInput.tsx";

const meta: Meta<typeof PasswordInput> = {
    component: PasswordInput,
    title: 'Input/PasswordInput',
    decorators: [
        (Story) => (
            <div className="div-input-stories">
                <Story/>
            </div>)
    ],
    render: (args) => <PasswordInput {...args}/>,
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;
export const Default: Story = {
    args: {
        name: "password",
        label: "Password",
        required: true
    }
};

