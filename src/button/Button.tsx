import React from 'react';
import './assets/button.css';
import type {Variant} from "../common/Variant.ts";
import type {Size} from "../common/Size.ts";

export const Button: React.FC<ButtonProps> =
    ({
         type = 'button', variant, size = 'medium', title,
         active, disabled, rounded, className,
         onClick, onMouseDown, onMouseEnter, onMouseLeave, children, ...props
     }) => {
        const mergedClassName = 'muncher-button' +
            (type && type === 'nav' ? ' muncher-button--nav' : '') +
            (variant ? ' muncher-button--' + variant : '') +
            (size ? ' muncher-button--' + size : '') +
            (active ? ' muncher-button--active' : '') +
            (rounded ? ' muncher-button--rounded' : '') +
            (className ? ' ' + className : '');

        return (
            <button
                type={type ? type !== 'nav' ? type : 'button' : 'button'}
                className={mergedClassName}
                disabled={!!disabled}
                title={title}
                onClick={onClick}
                onMouseDown={onMouseDown}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                {...props}
            >
                {children}
            </button>
        );
    };

export type ButtonTypes = 'button' | 'submit' | 'reset' | 'nav';

export interface AllButtonProps {
    variant?: Variant;
    size?: Size;
    className?: string;
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
    children?: React.ReactNode;
}

export interface ButtonProps extends AllButtonProps {
    type?: ButtonTypes;


    /**
     * button click handler
     */
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

    /**
     * button mouse down handler
     */
    onMouseDown?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

    onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

}
