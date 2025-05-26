import type {Meta} from '@storybook/react';
import type {StoryFn} from "@storybook/react";
import {useState} from "react";
import "./assets/item-slider-stories.css";
import moment from "moment";
import {Slider} from "./Slider";

const meta: Meta<typeof Slider> = {
    component: Slider,
    title: 'Slider/Slider'
};
export default meta;
type Story = StoryFn<typeof meta>;
export const Default: Story = (args) => {
    const [value, setValue] = useState(200);
    return (
        <div className="slider-story">
            <Slider  {...args} min={1} max={1000}
                     numberFormatter={num => new Intl.NumberFormat('en-US', {
                         style: 'currency',
                         currency: 'USD'
                     }).format(num)}
                     value={value}
                     setValue={setValue}
            />
        </div>
    );
}


export const DateSlider: Story = (args) => {
    const min = moment().subtract(3, 'years').valueOf();
    const now = moment().valueOf();
    const max = moment().subtract(-3, 'years').valueOf();

    const [value, setValue] = useState(now);
    return (
        <div className="slider-story">
            <Slider  {...args} min={min} max={max}
                     value={value}
                     setValue={setValue}
                     numberFormatter={num => new Intl.DateTimeFormat('en-US').format(num)}
            />
        </div>
    );
}
