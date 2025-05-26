import React, {useState} from 'react';
import './assets/input.css';
import {Label} from './Label';

export const Radio: React.FC<RadioProps> = ({name, required = false, onChange, checked = false, label, ...props}) => {
    const [radioChecked, setRadioChecked] = useState(checked ? checked : false);

    return (
        <div className="muncher-input--div">
            <div className="muncher-radio">
                <input
                    id={name}
                    type="radio"
                    name={name}
                    onChange={event => {
                        setRadioChecked(event.target.checked);
                        if (onChange) {
                            onChange();
                        }
                    }}
                    checked={radioChecked}
                    {...props}
                />
                {label ? <Label label={label} required={required} id={name}
                                onClick={() => {
                                    setRadioChecked(!radioChecked);
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

