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
                    {required ? <option value="">-- Select --</option> : ""}
                    {
                        options.map((option, i) =>
                            <option key={`select-option-${i}`} value={option.value}>
                                {option.label}
                            </option>
                        )
                    }
                </select>
            </div>
            {hasError() ? <div className="muncher-input-error-message"><Icon name="alert">{error}</Icon></div> : ""}
        </div>
    );
};

// Updated interface
export interface SelectOption {
    label: string;
    value: string;
}

export interface SelectProps {
    name: string;
    options: SelectOption[];
    label?: string;
    required?: boolean;
    multiple?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    value?: any;
    error?: string;
}
