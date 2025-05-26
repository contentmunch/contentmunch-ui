import React from 'react';
import './assets/drop-down-nav-button.css';
import {Button} from "./Button";

export const DropdownNavButton: React.FC<DropdownNavButtonProps> = (
    {
        title, active, disabled, element, rounded,
        children, ...props
    }) => {

    return (
        <div className="muncher-dropdown-nav">
            <Button type="nav" title={title} disabled={disabled} rounded={rounded}
                    active={active} {...props}>
                {element}
            </Button>
            <div className="muncher-dropdown-nav--content">
                {children}
            </div>
        </div>
    );
}

export interface DropdownNavButtonProps {
    /**
     *  button title, corresponds to title on hover
     */
    title?: string;
    active?: boolean;
    disabled?: boolean;
    /**
     * if true, the button edges are rounded
     */
    rounded?: boolean;

    element: React.ReactNode;
    children?: any;
}
