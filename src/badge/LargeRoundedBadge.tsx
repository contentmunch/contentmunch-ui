import React from 'react';
import {Badge} from "./Badge.tsx";
import "./assets/badge-large-rounded.css";
import type {Variant} from "../common/Variant.ts";
import {Icon} from "../icon/Icon.tsx";

export const LargeRoundedBadge: React.FC<LargeRoundedBadgeProps> = ({variant, completed, children}) => {


    return (
        <div className="muncher-badge--large-rounded">
            <Badge variant={variant ? variant : "tertiary"} rounded={true}>
                {completed ?
                    <div className="badge-content">
                        <Icon name="simple-check"/>
                    </div> :
                    children}
            </Badge>
        </div>
    )
};

export interface LargeRoundedBadgeProps {
    variant?: Variant;
    completed?: boolean;
    children: React.ReactNode;
}

