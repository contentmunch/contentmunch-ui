import React from 'react';
import './assets/button.css';

export const Button: React.FC<ButtonProps> =
    ({
         type = 'button', variant, size = 'medium', title,
         active, disabled, rounded,
         onClick, onMouseDown, onMouseEnter, onMouseLeave, children, ...props
     }) => {
        const className = 'muncher-button' +
            (type && type === 'nav' ? ' muncher-button--nav' : '') +
            (variant ? ' muncher-button--' + variant : '') +
            (size ? ' muncher-button--' + size : '') +
            (active ? ' muncher-button--active' : '') +
            (rounded ? ' muncher-button--rounded' : '');
        return (
            <button
                type={type ? type !== 'nav' ? type : 'button' : 'button'}
                className={className}
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

export type Variant = 'primary' | 'secondary' | 'tertiary' | 'transparent' | 'danger';
export type Size = 'small' | 'medium' | 'large';
