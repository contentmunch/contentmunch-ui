import React, {type ReactElement, useState} from "react";
import "./assets/item-slider.css";
import {type NavIcon, NavigateButton} from "../button/NavigateButton";
import type {Size} from "../common/Size.ts";
import type {Variant} from "../common/Variant.ts";

export const ItemSlider: React.FC<ItemSliderProps> = (
    {sliderItems, navButtonSize = 'large', navButtonWeight = 2, variant, navIcon, navButtonPlacement = 'inside'}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [translate, setTranslate] = useState(0);


    const renderLeftButton = () =>
        sliderItems.length > 1 && currentIndex > 0 ?
            <NavigateButton direction="left" size={navButtonSize}
                            variant={variant}
                            navIcon={navIcon} weight={navButtonWeight}
                            onClick={() => {
                                if (currentIndex === 0) {
                                    setTranslate(-(sliderItems.length - 1) * 100)
                                    setCurrentIndex(sliderItems.length - 1);
                                } else {

                                    setTranslate(translate + 100);
                                    setCurrentIndex(currentIndex - 1);
                                }

                            }}/> : ""

    const renderRightButton = () => sliderItems.length > 1 && currentIndex < sliderItems.length - 1 ?
        <NavigateButton direction="right" size={navButtonSize} weight={navButtonWeight}
                        navIcon={navIcon}
                        variant={variant}
                        onClick={() => {
                            if (currentIndex === sliderItems.length - 1) {
                                setCurrentIndex(0);
                                setTranslate(0);

                            } else {
                                setTranslate(translate - 100);
                                setCurrentIndex(currentIndex + 1);
                            }

                        }}/> : ""

    return (
        <div className={"muncher-item-slider-wrapper--" + navButtonPlacement}>
            {navButtonPlacement === 'outside' ? renderLeftButton() : ""}
            <div className="muncher-item-slider">
                {navButtonPlacement === 'inside' ? renderLeftButton() : ""}
                <div className="slider-container" style={{width: `${100 * sliderItems.length}%`}}>
                    {sliderItems.map((sliderItem, index) =>
                        <div className="slider-item"
                             style={{transform: `translateX(${translate}%)`}}
                             key={"slider-item" + index}>
                            {
                                sliderItem
                            }
                        </div>
                    )}
                </div>
                {navButtonPlacement === 'inside' ? renderRightButton() : ""}
            </div>
            {navButtonPlacement === 'outside' ? renderRightButton() : ""}
        </div>
    );
};

export interface ItemSliderProps {
    sliderItems: ReactElement[];
    navButtonSize?: Size;
    navButtonWeight?: 1 | 2 | 3;
    navIcon?: NavIcon;
    variant?: Variant;
    navButtonPlacement?: 'inside' | 'outside';
}

