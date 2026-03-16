import React from 'react';
import './assets/badge.css';
import type {Variant} from "../common/Variant.ts";

export const Badge: React.FC<BadgeProps> = ({variant, rounded, border, children, ...props}) => {

    const className = 'muncher-badge' +
        (variant ? ' muncher-badge--' + variant : '') +
        (rounded ? ' muncher-badge--rounded' : '') +
        (border ? ' muncher-badge--border' : '');
    return (
        <div className={className} {...props}>
            {children}
        </div>
    )
};

export interface BadgeProps {
    variant?: Variant;
    rounded?: boolean;
    border?: boolean;
    children: React.ReactNode;
}

