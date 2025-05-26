import React from 'react';
import './assets/spinner.css';

export const Spinner: React.FC<SpinnerProps> = ({size, ...props}) =>
    <div
        className={size ? "muncher-spinner muncher-spinner-" + size : "muncher-spinner"} {...props}
    />

export interface SpinnerProps {
    size?: SpinnerSize
}

export type SpinnerSize = 'tiny' | 'small' | 'medium' | 'large';
