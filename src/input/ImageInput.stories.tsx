import type {Meta, StoryObj} from '@storybook/react';
import {ImageInput} from "./ImageInput";

const meta: Meta<typeof ImageInput> = {
    component: ImageInput,
    title: 'Input/Image Input',
    render: (args) => <ImageInput {...args}/>,

};

export default meta;
type Story = StoryObj<typeof ImageInput>;
export const Default: Story = {
    args: {
        name: "file",
        label: "upload image",
        required: true,
        multiple: true,
        setFiles: () => {
        }
    }
};
