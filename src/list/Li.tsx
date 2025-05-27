import React from "react";
import {Icon} from "../icon/Icon";
import type {IconName} from "../icon/Drawings";
import type {Size} from "../common/Size.ts";

export const Li: React.FC<LiProps> = (
    {isFeatured, bulletIcon = "arrow-right", bulletWeight = 2, bulletSize = "small", bulletColor, children}) => {
    return (
        <li className={isFeatured ? "muncher-li featured" : "muncher-li"}>
            <Icon name={bulletIcon} weight={bulletWeight}
                  size={bulletSize}
                  color={bulletColor}>{children}
            </Icon>
        </li>);
}

export interface LiProps {
    isFeatured?: boolean;
    bulletColor?: string;
    bulletWeight?: 1 | 2 | 3;
    bulletSize?: Size;
    bulletIcon?: IconName;
    children?: any;
}
