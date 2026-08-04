import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';
import "./assets/input-story.css";
import {Combobox} from "./Combobox";

// Combobox now expects items shaped like { id, name } -- extra fields (like
// inSeason below) are fine, structural typing just needs those two present.
interface Fruit {
    id: number;
    name: string;
    inSeason: boolean;
}

const fruits: Fruit[] = [
    {id: 1, name: "Apple", inSeason: true},
    {id: 2, name: "Banana", inSeason: true},
    {id: 3, name: "Cherry", inSeason: false},
    {id: 4, name: "Grape", inSeason: true},
    {id: 5, name: "Grapefruit", inSeason: false},
    {id: 6, name: "Mango", inSeason: false},
    {id: 7, name: "Orange", inSeason: true},
    {id: 8, name: "Papaya", inSeason: false},
    {id: 9, name: "Pineapple", inSeason: true},
    {id: 10, name: "Watermelon", inSeason: true},
];

const meta: Meta<typeof Combobox> = {
    component: Combobox,
    title: 'Input/Combobox',
    decorators: [
        (Story) => (
            <div className="div-input-stories">
                <Story/>
            </div>)
    ],
    // keeps selectedId in local state so picking an option is visible in the
    // canvas, since Combobox is controlled and won't update on its own.
    render: (args) => {
        const [selectedId, setSelectedId] = useState(args.selectedId);
        return (
            <Combobox
                {...args}
                selectedId={selectedId}
                onSelect={id => {
                    setSelectedId(id);
                    args.onSelect?.(id);
                }}
            />
        );
    },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Default: Story = {
    args: {
        name: "fruit",
        items: fruits,
        selectedId: null,
    }
};

export const WithSelection: Story = {
    args: {
        ...Default.args,
        selectedId: 7,
    }
};

export const NoMatches: Story = {
    args: {
        ...Default.args,
        items: [],
        emptyMessage: "No matching fruit"
    }
};

export const CustomFilter: Story = {
    args: {
        ...Default.args,
        items: fruits,
        emptyMessage: "No in-season fruit matches",
        // matches on name AND only shows fruit currently in season
        filter: (item, query) =>
            (fruits.find(f => f.id === item.id)?.inSeason ?? false)
            && item.name.toLowerCase().includes(query.trim().toLowerCase()),
    }
};

export const OnSelect: Story = {
    args: {
        ...Default.args,
        onSelect: (id) => {
            console.log("selected", id);
        }
    }
};

export const ReadOnlyWithSelection: Story = {
    args: {
        ...Default.args,
        selectedId: 7,
        readOnly: true,
    }
};

export const ReadOnlyEmpty: Story = {
    args: {
        ...Default.args,
        selectedId: null,
        readOnly: true,
    }
};
