import React, {useState} from 'react';
import "./assets/input.css";
import {Label} from './Label';

export const Textarea: React.FC<TextareaProps> = (
    {
        name, label, required, readOnly = false,
        rows = 6, maxLength = 1000, focus = false,
        placeholder, onChange, value, showCount = true,
        ...props
    }
) => {
    const [textareaValue, setTextareaValue] = useState(value);

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
            {showCount && (
                <p>{textareaValue ? maxLength - textareaValue.length : maxLength} characters left</p>
            )}
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
    showCount?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value?: string;
}
