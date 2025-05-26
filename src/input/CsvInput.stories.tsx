import type {Meta, StoryObj} from '@storybook/react';
import {CsvInput} from "./CsvInput";

const meta: Meta<typeof CsvInput> = {
    component: CsvInput,
    title: 'Input/Csv Input',
    render: (args) => <CsvInput {...args}/>,
};

export default meta;
type Story = StoryObj<typeof CsvInput>;
export const Default: Story = {
    args: {
        name: "file",
        required: true,
        isUploading: true,
        handleOnChange: (file: File) => {
            console.log(file);
        }
    }
};
