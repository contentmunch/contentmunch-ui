import type {Meta} from '@storybook/react';
import type {StoryFn} from "@storybook/react";
import {useState} from "react";
import {RangeSlider} from "./RangeSlider";
import {DropdownButton} from "../button/DropdownButton";

const meta: Meta<typeof RangeSlider> = {
    component: RangeSlider,
    title: 'Slider/Dropdown Range Slider'
};
export default meta;
type Story = StoryFn<typeof meta>;
export const Default: Story = (args) => {
    const [showContent, setShowContent] = useState(false);
    const [minValue, setMinValue] = useState(20);
    const [maxValue, setMaxValue] = useState(600);
    return (
        <div className="slider-stories">
            <DropdownButton showContent={showContent} setShowContent={setShowContent}
                            element={"slider(min: " + minValue + " max: " + maxValue + ")"}>
                <RangeSlider {...args} min={1} max={1000}
                             minValue={minValue} maxValue={maxValue}
                             setMinValue={setMinValue} setMaxValue={setMaxValue}
                             numberFormatter={num => new Intl.NumberFormat('en-UK', {
                                 style: 'currency',
                                 currency: 'GBP'
                             }).format(num)}
                />
            </DropdownButton>
        </div>
    );
}
