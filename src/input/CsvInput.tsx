import React from "react";
import "./assets/file-input.css";
import {Icon} from "../icon/Icon";
import {Spinner} from "../spinner/Spinner";

export const CsvInput: React.FC<CsvInputProps> = (
    {
        name, label, variant = 'secondary', size = 'medium',
        required, active, isUploading,
        handleOnChange, warningMessage, successMessage, ...props
    }
) => {
    const labelClass = 'muncher-button' +
        (variant ? ' muncher-button--' + variant : '') +
        (size ? ' muncher-button--' + size : '') +
        (active ? ' muncher-button--active' : '');

    const onChange = (event: any) => {
        if (handleOnChange)
            handleOnChange(event.currentTarget.files[0]);
    }
    return (
        <div className="muncher-file-input--div">
            <div className="file-input-element">
                <label htmlFor={name} className={labelClass}>
                    <Icon name="upload"/>&nbsp;{label ? label : "Upload CSV"}{required ?
                    <span className="required">&nbsp;*</span> : ''}
                    {isUploading ? <Spinner size="tiny"/> : ""}
                </label>
                <input id={name} type="file" className="muncher-file-input" required={required}
                       onChange={onChange}
                       accept="text/csv" {...props}/>
                {warningMessage && warningMessage !== "" ? <p className="text-danger">{warningMessage}</p> : ""}
                {successMessage && successMessage !== "" ? <p className="text-success">{successMessage}</p> : ""}
            </div>

        </div>

    );
};

export interface CsvInputProps {
    name: string;
    label?: string;
    variant?: 'primary' | 'secondary' | 'tertiary';
    size?: 'small' | 'medium' | 'large';
    required?: boolean;
    active?: boolean;
    handleOnChange?: (file: File) => void;
    isUploading?: boolean;
    warningMessage?: string;
    successMessage?: string;
}
