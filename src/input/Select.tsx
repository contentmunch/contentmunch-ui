import React from "react";
import {Label} from "./Label";
import {Icon} from "../icon/Icon";
import "./assets/input.css";

export const Select: React.FC<SelectProps> = (
    {
        name, options, label, required, multiple,
        error, onChange, value, ...props
    }
) => {
    const hasError = () => error && error !== "";
    const className = () => {
        let inputClass = "muncher-input";
        if (hasError()) inputClass += " muncher-input-error";
        return inputClass;
    };
    return (
        <div className="muncher-input--div">
            {label ? <Label label={label} required={required} id={name}/> : ''}
            <div className="muncher-input-element">
                <select
                    id={name}
                    className={className()}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    multiple={multiple}
                    {...props}
                >
                    {required ? <option/> : ""}
                    {
                        options.map((option, i) =>
                            <option key={"select-option-" + i} value={option}>{option}</option>)
                    }
                </select>
            </div>
            {hasError() ? <div className="muncher-input-error-message"><Icon name="alert">{error}</Icon></div> : ""}
        </div>
    );
};

export interface SelectProps {
    name: string;
    options: string[];
    label?: string;
    required?: boolean;
    multiple?: boolean;
    onChange?: (value: React.ChangeEvent<HTMLSelectElement>) => void;
    value?: any;
    error?: string;
}
