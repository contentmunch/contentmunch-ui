import React, {useState} from "react";
import {Input} from "./Input.tsx";

export const PasswordInput: React.FC<PasswordInputProps> = (
    {name, label, required, placeholder, onChange, value, error, labelPosition}) => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    return (
        <Input label={label} name={name}
               type={showPassword ? "text" : "password"} hoverIcon={showPassword ? "eye" : "eye-off"}
               value={value}
               required={required}
               placeholder={placeholder}
               onChange={onChange}
               error={error}
               labelPosition={labelPosition}
               onHoverIconClick={togglePasswordVisibility}
        />
    );
}

export interface PasswordInputProps {
    name: string;
    label?: string;
    required?: boolean;
    placeholder?: string;
    onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
    value?: any;
    error?: string;
    labelPosition?: 'top' | 'side';
}
