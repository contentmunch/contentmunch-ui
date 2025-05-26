import {useState} from "react";
import type {Meta, StoryFn} from '@storybook/react';
import {Backdrop} from "./Backdrop";
import {Button} from "../button/Button";

const meta = {
    title: "Feedback/Backdrop",
    component: Backdrop,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof Backdrop>;
export default meta;
type Story = StoryFn<typeof meta>;
export const Default: Story = (args) => {
    const [show, setShow] = useState(false);
    return (
        <>
            <Button onClick={() => {
                setShow(true)
            }} {...args}> {show ? "Click anywhere in the backdrop" : "Click to see backdrop"}</Button>
            <Backdrop show={show} backdropClickHandler={() => {
                setShow(false)
            }}/>
        </>
    );
}
