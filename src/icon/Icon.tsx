import React from "react";
import {drawings, type IconName} from "./Drawings";
import './assets/icon.css';
import type {Size} from "../common/Size.ts";

export const Icon: React.FC<IconProps> =
    ({color, name, size = 'small', weight = 2, onClick, iconString, orientation="left", children}) => {
        const iconClass = `muncher-icon--${size}`;

        const glyph = (() => {
            if (name) return drawings[name];

            if (iconString && iconString in drawings) {
                return drawings[iconString as keyof typeof drawings];
            }

            if (process.env.NODE_ENV === "development") {
                console.warn("Unknown icon:", iconString);
            }

            return drawings.muncher;
        })();

        return (
            <span className="muncher-icon">
                {(children && orientation && orientation === "right") ?
                    <span className="content-left">{children}</span> : ""}
                <svg
                    className={iconClass}
                    stroke={color ? color : 'currentColor'}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth={weight ? weight : 2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    onClick={onClick}
                >
                    {
                       glyph
                    }
                </svg>
                {children && orientation === "left" && (
                    <span className="content-right">{children}</span>
                )}
            </span>
        );
    };


export interface IconProps {
    /**
     * stroke color of the icon. By default, it is set to current color
     */
    color?: string;
    weight?: 1 | 2 | 3;
    size?: Size;

    /**
     * icon click handler
     */
    onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;

    name?: IconName;
    iconString?: string;
    orientation?: "left" | "right";
    children?: any;
}

