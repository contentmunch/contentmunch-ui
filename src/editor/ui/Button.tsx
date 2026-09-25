import React from "react";
import "./assets/button.css"

export const Button: React.FC<ButtonProps> = ({disabled, onClick, title, ariaLabel, active, children}) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            title={title}
            type="button"
            className={active ? "content-editor-button active" : "content-editor-button"}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    );
}

export interface ButtonProps {
    disabled: boolean;
    onClick: () => void;
    title: string;
    ariaLabel: string;
    children?: React.ReactNode
    active?: boolean;
}
