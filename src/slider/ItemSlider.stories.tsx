import type {Meta, StoryObj} from '@storybook/react';
import "./assets/item-slider-stories.css";
import {ItemSlider} from "./ItemSlider";

const meta: Meta<typeof ItemSlider> = {
    component: ItemSlider,
    title: 'Slider/Item Slider',
    decorators: [
        (Story) => (
            <div className="container">
                <div className="slider-story">
                    <Story/>
                </div>
            </div>)
    ],
    render: (args) => <ItemSlider {...args}/>,
};

export default meta;
type Story = StoryObj<typeof ItemSlider>;
export const Default: Story = {
    args: {
        sliderItems: [<div className="slider-story--item"><img
            src="https://www.renaissancerentals.com/api/asset/download/1s5-NPYxlB5NRsMMhX8MB-pDsN1bqEoZ_"
            className="slide"/></div>,
            <div className="slider-story--item"><img
                src="https://www.renaissancerentals.com/api/asset/download/1n0NNoyBnzt-nfECziwiuPxz7k-InaMq_"
                className="slide"/></div>,
            <div className="slider-story--item"><img
                src="https://www.renaissancerentals.com/api/asset/download/1rtcmnLUABimyLpQ6kWm2GD3kJLNMBjKB"
                className="slide"/></div>,


        ]
    }
};

export const WithArrowIcon: Story = {
    args: {
        ...Default.args,
        navIcon: "arrow"
    }
};
export const Tranparent: Story = {
    args: {
        ...Default.args,
        navIcon: "arrow",
        navButtonWeight: 1,
        variant: "transparent"
    }
};
export const SingleItem: Story = {
    args: {
        sliderItems: [<img src="https://www.renaissancerentals.com/api/asset/download/1n0NNoyBnzt-nfECziwiuPxz7k-InaMq_"
                           className="slide" width="500" height="300"/>]
    }
};
