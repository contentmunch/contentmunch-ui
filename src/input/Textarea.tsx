import React, {useState} from 'react';
import "./assets/input.css";
import {Label} from './Label';

export const Textarea: React.FC<TextareaProps> = (
    {
        name, label, required, readOnly = false,
        rows = 6, maxLength = 1000, focus = false,
        placeholder, onChange, value, ...props
    }
) => {
    const [textareaValue, setTextareaValue] = useState(value);
    const handleTextareaChange = (event: any) => {
        setTextareaValue(event.target.value);
        if (onChange)
            onChange(event);
    }
    return (
        <div className="muncher-input--div">
            {label ? <Label label={label} required={required} id={name}/> : ''}
            <textarea
                id={name}
                className="muncher-textarea"
                rows={rows}
                maxLength={maxLength}
                name={name}
                autoFocus={focus}
                value={value}
                placeholder={placeholder}
                onChange={handleTextareaChange}
                required={required}
                readOnly={readOnly}
                {...props}
            />
            <p>{textareaValue ? maxLength ? maxLength - textareaValue.length : 1000 : maxLength} characters left</p>
        </div>

    );
}

export interface TextareaProps {
    name: string;
    label?: string;
    required?: boolean;
    readOnly?: boolean;
    rows?: number;
    maxLength?: number;
    focus?: boolean;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value?: any;
}
