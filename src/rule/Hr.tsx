import React from "react";
import type {Variant} from "../common/Variant.ts";
import type {Size} from "../common/Size.ts";
import "./assets/hr.css";

export const Hr: React.FC<HrProps> = ({variant, size, style}) => {

    const className = 'muncher-hr' +
        (variant ? ' muncher-hr--' + variant : '') +
        (size ? ' muncher-hr--' + size : '') +
        (style ? ' muncher-hr--' + style : '');

    return (<hr className={className}/>);
}

export interface HrProps {
    variant?: Variant;
    size?: Size;
    style?: "sold" | "dotted" | "dashed";
}
