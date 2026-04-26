import React from 'react';
import './assets/backdrop.css';

export const Backdrop: React.FC<BackdropProps> =
    ({
         show = false,
         className,
         backdropClickHandler, ...props
     }) => {
        const mergedClassName = 'muncher-backdrop' +
            (className ? ' ' + className : '');
        return (
            show ?
                <div className={mergedClassName} onClick={backdropClickHandler} {...props}>

                </div> : null
        )
    };

export interface BackdropProps {
    /**
     * Show and hide backdrop
     */
    show?: boolean;
    className?: string;
    /**
     * backdrop click handler
     */
    backdropClickHandler?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
