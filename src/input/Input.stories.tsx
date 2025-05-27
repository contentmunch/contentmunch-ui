import type {Meta, StoryObj} from '@storybook/react';
import "./assets/input-story.css";
import {Input} from "./Input";

const meta: Meta<typeof Input> = {
    component: Input,
    title: 'Input/Input',
    decorators: [
        (Story) => (
            <div className="div-input-stories">
                <Story/>
            </div>)
    ],
    render: (args) => <Input {...args}/>,
};

export default meta;
type Story = StoryObj<typeof Input>;
export const Default: Story = {
    args: {
        name: "query",
        type: "text",
        placeholder: "Type your query",
    }
};

export const TextWithLabel: Story = {
    args: {
        ...Default.args,
        label: 'Search',
        required: true,
    }
};
export const TextWithLabelOnTheSide: Story = {
    args: {
        ...Default.args,
        label: 'Search the string',
        required: true,
        labelPosition: 'side'
    }
};
export const TextWithIcon: Story = {
    args: {
        ...TextWithLabel.args,
        icon: "muncher"
    }
};
export const TextWithHoverIcon: Story = {
    args: {
        ...TextWithLabel.args,
        hoverIcon: "muncher",
        onHoverIconClick: () => {
            console.log("hover icon clicked");
        }
    }
};
export const WithError: Story = {
    args: {
        ...TextWithIcon.args,
        error: "Provide value for Search"
    }
};

export const Color: Story = {
    args: {
        ...Default.args,
        type: 'color'
    }
};
export const Date: Story = {
    args: {
        ...Default.args,
        type: 'date'
    }
};
export const DateTime: Story = {
    args: {
        ...Default.args,
        type: 'datetime-local'
    }
};
export const Email: Story = {
    args: {
        ...Default.args,
        type: 'email',
        placeholder: "Email",
        icon: "mail"
    }
};
export const Month: Story = {
    args: {
        ...Default.args,
        type: 'month',
    }
};
export const Number: Story = {
    args: {
        ...Default.args,
        type: 'number',
        placeholder: "Phone number",
        icon: "phone"
    }
};
export const Float: Story = {
    args: {
        ...Default.args,
        type: 'number',
        step: 0.5,
        placeholder: "Floating point number",
    }
};
export const Password: Story = {
    args: {
        ...Default.args,
        type: 'password',
        placeholder: "Type password"
    }
};
export const Range: Story = {
    args: {
        ...Default.args,
        type: 'range'
    }
};
export const Search: Story = {
    args: {
        ...Default.args,
        type: 'search',
    }
};
export const Tel: Story = {
    args: {
        ...Default.args,
        type: 'tel',
    }
};
export const Time: Story = {
    args: {
        ...Default.args,
        type: 'time',
    }
};
export const Url: Story = {
    args: {
        ...Default.args,
        type: 'url',
        placeholder: 'type url'
    }
};
export const Week: Story = {
    args: {
        ...Default.args,
        type: 'week',
    }
};
export const EnterPressed: Story = {
    args: {
        ...Default.args,
        onEnterPress: () => {console.log("Enter pressed");}
    }
}
