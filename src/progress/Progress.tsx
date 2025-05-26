import React from "react";
import "./assets/progress.css";

export const Progress: React.FC<ProgressProps> = ({value, max, label}) => {
    const progressValue = () => {
        const percent = (Math.round(value / max * 100)) + "%";
        return label ? label + " " + percent : percent;
    };
    return (
        <div className="muncher-progress">
            <label htmlFor="progress">{progressValue()}</label>
            <progress id="progress" value={value} max={max}>{progressValue()}</progress>
        </div>
    );
};

export interface ProgressProps {
    value: number;
    max: number;
    label?: string;
}
