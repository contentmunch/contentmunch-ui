import React from 'react';
import './assets/badge.css';
import type {Variant} from "../button/Button";

export const Badge: React.FC<BadgeProps> = ({variant, children, ...props}) => {
    return (
        <div className={variant ? "muncher-badge muncher-badge--" + variant : "muncher-badge"} {...props}>
            {children}
        </div>
    )
};

export interface BadgeProps {
    variant?: Variant
    children: React.ReactNode;
}
