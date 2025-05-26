import React from 'react';
import './assets/navigate-button.css';
import {Button, type Size, type Variant} from "./Button";
import {Icon} from "../icon/Icon";
import type {IconName} from "../icon/Drawings";

export const NavigateButton: React.FC<NavigateButtonProps> = (
    {
        direction, size = 'small', weight, isDisabled, variant = 'primary', navIcon = 'chevron', onClick
    }) => {
    const iconName = (): IconName => {
        switch (navIcon) {
            case "arrow":
                return direction === "left" ? "arrow-left" : "arrow-right";
            case "skip":
                return direction === "left" ? "skip-back" : "skip-forward";
            case "forward":
                return direction === "left" ? "rewind" : "fast-forward";
            default:
                return direction === "left" ? "chevron-left" : "chevron-right"
        }

    }
    return (
        <div
            className={direction === "left" ? "muncher-button--navigate muncher-button--navigate-left" :
                "muncher-button--navigate muncher-button--navigate-right"}>

            <Button onClick={onClick} disabled={isDisabled} size="small" variant={variant}
                    title={direction === "left" ? "Navigate Left" : "Navigate Right"}>
                <Icon name={iconName()} size={size} weight={weight}/>
            </Button>
        </div>
    );
};

export interface NavigateButtonProps {
    size?: Size;
    weight?: 1 | 2 | 3;
    direction: "left" | "right";
    isDisabled?: boolean;
    variant?: Variant;
    navIcon?: NavIcon;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export type NavIcon = "arrow" | "chevron" | "skip" | "forward";
