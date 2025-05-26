import React, {useState} from "react";
import "./assets/file-input.css";
import {Icon} from "../icon/Icon";

export const ImageInput: React.FC<ImageInputProps> = (
    {
        name, label, variant = 'secondary', size = 'large',
        required, active, setFiles, error,
        multiple = false, maxFiles, ...props
    }
) => {
    const [fileNames, setFileNames] = useState("");
    const [fileInputWarning, setFileInputWaring] = useState("");
    const max = maxFiles ? maxFiles : 3;
    const labelClass = 'muncher-button' +
        (variant ? ' muncher-button--' + variant : '') +
        (size ? ' muncher-button--' + size : '') +
        (active ? ' muncher-button--active' : '');

    const handleOnChange = (event: any) => {

        if (multiple) {
            let files: Array<File> = Array.from(event.currentTarget.files);
            if (files.length > max) {
                files = files.slice(0, max);
                setFileInputWaring("Only first " + max + " files included");
            }
            setFiles(files);
            setFileNames(files.map(file => file.name).join(", "));

        } else {
            setFiles(Array.from(event.currentTarget.files[0]));
            setFileNames(event.currentTarget.files[0].name);
        }

    }
    const hasError = () => error && error !== "";
    return (
        <div className="muncher-file-input--div">
            <div className="file-input-element">
                <label htmlFor={name} className={labelClass}>
                    <Icon name="image"/>&nbsp;{label}{required ? <span className="required">&nbsp;*</span> : ''}
                </label>
                <span className="span-file-name">{fileNames}</span>
                <input id={name} type="file" className="muncher-file-input"
                       name={name}
                       onChange={handleOnChange}
                       multiple={multiple} accept="image/*" {...props}/>
            </div>
            {fileInputWarning !== "" ? <p className="text-danger">{fileInputWarning}</p> : ""}
            {hasError() ?
                <div className="muncher-input-error-message"><Icon name="alert">{error}</Icon></div> : ""}
        </div>

    );
};

export interface ImageInputProps {
    name: string;
    label?: string;
    variant?: 'primary' | 'secondary' | 'tertiary';
    size?: 'small' | 'medium' | 'large';
    error?: string;
    required?: boolean;
    active?: boolean;
    multiple?: boolean;
    maxFiles?: number;
    setFiles: (files: any) => void;
}
