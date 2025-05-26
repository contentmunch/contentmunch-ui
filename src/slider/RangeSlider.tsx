import React from "react";
import "./assets/slider.css";

export const RangeSlider: React.FC<RangeSliderProps> = (
    {
        min, max, minValue, maxValue, setMinValue, setMaxValue,
        numberFormatter = (num => new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(num))
    }) => {


    const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentValue = +event.target.value;
        const currentMinValue = currentValue < maxValue - 1 ? currentValue : minValue
        setMinValue(currentMinValue);
    };
    const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentValue = +event.target.value;
        const currentMaxValue = currentValue > minValue + 1 ? currentValue : maxValue;
        setMaxValue(currentMaxValue);
    };

    const formatNumber = (num?: number) => {
        if (numberFormatter && num) {
            return numberFormatter(num);
        } else {
            return num;
        }
    }
    return (
        <div className="muncher-slider">
            <div className="slider-header"><p>{formatNumber(minValue) + " - " + formatNumber(maxValue)}</p></div>
            <input className="muncher-range" type="range" min={min} max={max} value={minValue}
                   onChange={handleMinChange}/>
            <input className="muncher-range" type="range" min={min} max={max} value={maxValue}
                   onChange={handleMaxChange}/>
            <div className="slider-values">
                <div className="slider-min">{formatNumber(min)}</div>
                <div className="slider-max">{formatNumber(max)}</div>
            </div>
        </div>
    );
}

export interface Range {
    min: number;
    max: number;
}

export interface RangeSliderProps extends Range {
    minValue: number;
    maxValue: number;
    setMinValue: (num: number) => void;
    setMaxValue: (num: number) => void;
    numberFormatter?: (num: number) => string;
    children?: any;
}
