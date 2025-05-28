import React from "react";
import "./assets/input.css";
import {Label} from "./Label";
import type {IconName} from "../icon/Drawings";
import {Icon} from "../icon/Icon";
import {Spinner} from "../spinner/Spinner.tsx";

export const Input: React.FC<InputProps> = (
    {
        name, label, required,
        readOnly, icon, hoverIcon, onHoverIconClick,
        type = 'text', list, onBlur, labelPosition = 'top',
        onKeyDown, error, focus = false, placeholder,
        onChange, step, value, maxLength, onEnterPress, displayLoader, ...props
    }
) => {
    const hasError = () => error && error !== "";
    const className = () => {
        let inputClass = "muncher-input";
        if (icon || hoverIcon) inputClass += " muncher-input-icon";
        if (hasError()) inputClass += " muncher-input-error";
        if (labelPosition === 'side') inputClass += " muncher-label-side";
        return inputClass;
    };
    const addLabel = () => {
        return label ? <Label label={label} required={required} id={name}/> : '';
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && onEnterPress) {
            onEnterPress();
        }
        if (onKeyDown) {
            onKeyDown(event);
        }
    };

    return (
        <div className="muncher-input--div">
            {labelPosition !== 'side' ? addLabel() : ''}
            <div className="muncher-input-element">
                {labelPosition === 'side' ? addLabel() : ''}
                {icon ? <Icon name={icon}/> : ""}
                {hoverIcon ?
                    <span className="muncher-icon-hover">
                    <Icon name={hoverIcon} onClick={onHoverIconClick}/> </span>
                    : ""}
                <div className="muncher-input-wrapper">
                    <input
                        id={name}
                        className={className()}
                        name={name}
                        autoFocus={focus}
                        value={value}
                        type={type ? type : 'text'}
                        autoComplete="off"
                        placeholder={placeholder}
                        onChange={onChange}
                        required={required}
                        readOnly={readOnly}
                        list={list}
                        onKeyDown={handleKeyDown}
                        onBlur={onBlur}
                        step={step}
                        maxLength={maxLength}
                        {...props}
                    />
                    {displayLoader ? <Spinner size="tiny"/> : ""}
                </div>
            </div>
            {hasError() ?
                <div className="muncher-input-error-message"><Icon name="alert">{error}</Icon></div> : ""}
        </div>

    );
}

export type InputType = 'color' | 'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' |
    'range' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week';

export interface InputProps {
    name: string;
    label?: string;
    required?: boolean;
    readOnly?: boolean;
    icon?: IconName;
    hoverIcon?: IconName;
    type?: InputType;
    focus?: boolean;
    placeholder?: string;
    list?: string;
    onHoverIconClick?: () => void;
    onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    value?: any;
    error?: string;
    step?: number;
    maxLength?: number;
    labelPosition?: 'top' | 'side';
    onEnterPress?: () => void;
    displayLoader?: boolean;
}
