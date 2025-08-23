import type {Meta, StoryFn} from '@storybook/react';
import {Radio} from "./Radio";
import {useState} from "react";


const meta = {
    title: 'Input/Radio',
    component: Radio,
    decorators: [
        (Story) => (
            <div style={{width: '95vw'}}>
                <Story/>
            </div>)
    ],
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryFn<typeof meta>;

export const Default: Story = () => {
    const [checkedAnswer, setCheckedAnswer] = useState<string>("");

    const handleAnswerChecked = (answer: string) => {
        if (checkedAnswer === answer) {
            setCheckedAnswer("");
        } else {
            setCheckedAnswer(answer);
        }
    }
    return (
        <div>
            <Radio name="question-option"
                   checked={checkedAnswer === "Image Processing"}
                   onChange={() => handleAnswerChecked("Image Processing")}
                   label="Image Processing"/>
            <Radio name="question-option"
                   checked={checkedAnswer === "File Storage"}
                   onChange={() => handleAnswerChecked("File Storage")}
                   label="File Storage"/>
            <Radio name="question-option"
                   checked={checkedAnswer === "Distributed Image Streaming"}
                   onChange={() => handleAnswerChecked("Distributed Image Streaming")}
                   label="Distributed Image Streaming"/>

        </div>

    )
};
