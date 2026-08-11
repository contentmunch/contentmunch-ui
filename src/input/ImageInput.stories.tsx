import {useState} from "react";
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

// Regression coverage for the single-file (non-multiple) path: setFiles used
// to receive Array.from(file) -- always [] for a single File, since File has
// no iterator -- so a selected file silently vanished. This story renders
// exactly what setFiles receives, so a selected file showing up here (rather
// than "0 file(s): ") is the proof the fix works.
const SingleFileDemo = () => {
    const [received, setReceived] = useState<File[]>([]);
    return (
        <div>
            <ImageInput name="single-file" label="upload one image" multiple={false} setFiles={setReceived}/>
            <p>{received.length} file(s): {received.map(f => f.name).join(", ")}</p>
        </div>
    );
};

export const SingleFileReceivedBySetFiles: Story = {
    render: () => <SingleFileDemo/>,
};
