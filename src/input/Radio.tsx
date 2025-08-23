import React from 'react';
import './assets/input.css';
import {Label} from './Label';

export const Radio: React.FC<RadioProps> = ({name, required = false, onChange, checked = false, label, ...props}) => {

    return (
        <div className="muncher-input--div">
            <div className="muncher-radio">
                <input
                    type="radio"
                    name={name}
                    onChange={onChange}
                    checked={checked}
                    {...props}
                />
                {label ? <Label label={label} required={required}
                                onClick={() => {
                                    if (onChange) {
                                        onChange();
                                    }
                                }}/> : ''}
            </div>
        </div>
    )
};

export interface RadioProps {
    name?: string;
    required?: boolean;
    label?: string;
    onChange?: () => void;
    checked?: any;
}

