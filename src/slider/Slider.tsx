import React from "react";
import "./assets/slider.css";

export const Slider: React.FC<SliderProps> = (
    {
        min, max, value, setValue,
        numberFormatter = (num => new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(num))
    }) => {

    const formatNumber = (num: number) => {
        if (numberFormatter) {
            return numberFormatter(num);
        } else {
            return num;
        }
    };
    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentValue = +e.target.value;
        setValue(currentValue);
    }
    return (
        <div className="muncher-slider">
            <div className="slider-header"><p>{formatNumber(value)}</p></div>
            <input className="muncher-range" type="range" min={min} max={max} value={value}
                   onChange={handleValueChange}/>
            <div className="slider-values">
                <div className="slider-min">{formatNumber(min)}</div>
                <div className="slider-max">{formatNumber(max)}</div>
            </div>
        </div>
    );
}

export interface SliderProps {
    min: number;
    max: number;
    value: number;
    setValue: (num: number) => void;
    numberFormatter?: (num: number) => string;

}
