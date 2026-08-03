import React, {useEffect, useState} from "react";
import "./assets/input.css";
import {Input} from "./Input";
import {Label} from "./Label";
import type {IconName} from "../icon/Drawings";
import {Icon} from "../icon/Icon";

export const EditableText: React.FC<EditableTextProps> = (
    {
        name, label, required, readOnly,
        icon, labelPosition = 'top', placeholder,
        error, information, maxLength,
        value, onEditComplete, displayLoader,
        emptyText = "—",
    }
) => {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(value ?? "");

    // keep draft in sync if the value changes from outside while not editing
    useEffect(() => {
        if (!editing) setDraft(value ?? "");
    }, [value, editing]);

    const hasError = () => error && error !== "";
    const hasInfo = () => information && information !== "";

    const startEditing = () => {
        if (readOnly) return;
        setDraft(value ?? "");
        setEditing(true);
    };

    const commit = () => {
        setEditing(false);
        if (draft !== (value ?? "") && onEditComplete) {
            onEditComplete(draft);
        }
    };

    const cancel = () => {
        setDraft(value ?? "");
        setEditing(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDraft(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Escape') {
            cancel();
        }
    };

    if (editing) {
        return (
            <Input
                name={name}
                label={label}
                required={required}
                icon={icon}
                labelPosition={labelPosition}
                placeholder={placeholder}
                error={error}
                information={information}
                maxLength={maxLength}
                type="text"
                value={draft}
                onChange={handleChange}
                onBlur={commit}
                onEnterPress={commit}
                onKeyDown={handleKeyDown}
                focus={true}
                displayLoader={displayLoader}
            />
        );
    }

    return (
        <div className="muncher-input--div muncher-editable-text">
            {label && labelPosition !== 'side' ?
                <Label label={label} required={required} id={name}/> : ''}
            <div
                className={"muncher-editable-display" + (readOnly ? " muncher-editable-display-readonly" : "")}
                onClick={startEditing}
                tabIndex={readOnly ? -1 : 0}
                role="button"
            >
                {labelPosition === 'side' && label ?
                    <Label label={label} required={required} id={name}/> : ''}
                <span className="muncher-editable-value">
                    {value && value !== "" ? value : (placeholder || emptyText)}
                </span>
            </div>
            {hasError() ?
                <div className="muncher-input-error-message"><Icon name="alert">{error}</Icon></div> : ""}
            {hasInfo() ?
                <div className="muncher-input-info-message"><Icon name="info">{information}</Icon></div> : ""}
        </div>
    );
};

export interface EditableTextProps {
    name: string;
    label?: string;
    required?: boolean;
    readOnly?: boolean;
    icon?: IconName;
    labelPosition?: 'top' | 'side';
    placeholder?: string;
    error?: string;
    information?: string;
    maxLength?: number;
    value?: string;
    /**
     * text shown when value is empty and no placeholder is given
     */
    emptyText?: string;
    /**
     * fired once editing ends (blur or Enter) with a value that differs from the original
     */
    onEditComplete?: (value: string) => void;
    displayLoader?: boolean;
}
