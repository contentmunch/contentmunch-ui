import React from "react";
import "./assets/icon-badge.css";
import {Icon} from "../icon/Icon";
import type {Variant} from "../common/Variant.ts";
import type {IconName} from "../icon/Drawings";
import {Badge} from "./Badge";

export const IconBadge: React.FC<IconBadgeProps> = (
    {
        variant = 'primary',
        icon = 'bell',
        text,
        onClick,
        ...props
    }) => {

    return (
        <div
            className="muncher-icon-badge" onClick={onClick} {...props}>
            <Icon name={icon}/>
            {text === "" ? "" : <Badge variant={variant}>{text}</Badge>}
        </div>
    );
};

export interface IconBadgeProps {
    variant?: Variant;
    icon?: IconName;
    text: String;
    onClick?: () => void;
}
