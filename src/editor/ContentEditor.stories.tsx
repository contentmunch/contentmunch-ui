import type {Meta, StoryObj} from '@storybook/react';
import {ContentEditor} from "./ContentEditor";

const meta = {
    title: 'Editor/ContentEditor',
    component: ContentEditor,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof ContentEditor>;
export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        onChange: () => {
        },
    },
};

export const WithInitialHtml: Story = {
    args: {
        html: '<p>Hello <strong>world</strong>!</p>',
        onChange: () => {
        },
    },
};

export const BasicVariant: Story = {
    args: {
        variant: 'basic',
        onChange: () => {
        },
    },
};
