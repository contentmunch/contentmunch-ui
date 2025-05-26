import React, {useState} from 'react';
import './assets/input.css';
import {Label} from "./Label";

export const Checkbox: React.FC<CheckboxProps> = (
    {
        name, required = false,
        onChange, checked = false, label,
        ...props
    }) => {

    const [checkboxChecked, setCheckboxChecked] = useState(checked ? checked : false);

    return (
        <div className="muncher-input--div">
            <div className="muncher-checkbox">
                <input type="checkbox"
                       id={name}
                       name={name}
                       onChange={event => {
                           setCheckboxChecked(event.target.checked);
                           if (onChange) {
                               onChange();
                           }
                       }}
                       checked={checkboxChecked}
                       required={required}
                       {...props}
                />
                {label ? <Label label={label} required={required} id={name}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCheckboxChecked(!checkboxChecked);
                                    if (onChange) {
                                        onChange();
                                    }
                                }}/> : ''}
            </div>
        </div>
    )
};

export interface CheckboxProps {
    name?: string;
    onChange?: () => void;
    required?: boolean;
    checked?: any;
    label?: string;
}

