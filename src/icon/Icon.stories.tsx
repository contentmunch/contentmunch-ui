import type {Meta, StoryObj} from '@storybook/react';
import type {StoryFn} from "@storybook/react";
import {useState} from "react";
import {Icon} from "./Icon";
import {Input} from "../input/Input";
import {drawings} from "./Drawings";
import {Button} from "../button/Button";
import "./assets/icon-stories.css";

const meta: Meta<typeof Icon> = {
    component: Icon,
    title: 'Visual/Icons',
    argTypes: {
        color: {control: 'color'},
    },
    render: (args) => <div><Icon {...args} /></div>
};

export default meta;
type Story = StoryObj<typeof Icon>;
type StoryFunction = StoryFn<typeof meta>;
export const Search: StoryFunction = () => {
    const [query, setQuery] = useState("");
    return (
        <div className="icon-search-story">
            <Input name={query} onChange={(e) => setQuery(e.target.value)} icon={"search"}/>
            {
                Object.keys(drawings).filter(key => key.search(new RegExp(query.replace(/\s*/g, ""), "i")) > -1).map(key =>
                    <Button key={key} size="small" rounded={true} title={key} variant={"tertiary"}>
                        <Icon iconString={key}/>
                    </Button>
                )
            }

        </div>
    );
}

export const Default: Story = {
    args: {
        name: 'muncher',
        size: 'small'
    }
};

export const Medium: Story = {
    args: {
        ...Default.args,
        size: 'medium',
        weight: 1
    }
}
export const Dark: Story = {
    args: {
        ...Medium.args,
        weight: 2
    }
}

export const IconWithText: Story = {
    args: {
        name: 'muncher',
        size: 'small',
        orientation: 'left'
    },
    render: (args) => <div><Icon {...args} ><p>Text</p></Icon></div>
}
