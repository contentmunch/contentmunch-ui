import React from 'react';
import './assets/backdrop.css';

export const Backdrop: React.FC<BackdropProps> =
    ({
         show = false,
         backdropClickHandler, ...props
     }) => {

        return (
            show ?
                <div className="muncher-backdrop" onClick={backdropClickHandler} {...props}>

                </div> : null
        )
    };

export interface BackdropProps {
    /**
     * Show and hide backdrop
     */
    show?: boolean;
    /**
     * backdrop click handler
     */
    backdropClickHandler?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
