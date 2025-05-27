import React, {useState} from "react";
import {Button} from "./Button";
import {Icon} from "../icon/Icon";
import type {Variant} from "../common/Variant.ts";
import type {Size} from "../common/Size.ts";
export const SortButton: React.FC<SortButtonProps> = (
    {
        variant = 'transparent', size = 'small', title, sortAsc = 'true',
        active, rounded, onClick, children
    }) => {

    const [isHoveringOver, setIsHoveringOver] = useState(false);
    const SortIcon: React.FC = () => {
        if (!active || (active && !isHoveringOver)) {
            return sortAsc ? <Icon name="sort-asc"/> : <Icon name="sort-desc"/>
        } else {
            return sortAsc ? <Icon name="sort-desc"/> : <Icon name="sort-asc"/>
        }
    }

    return (
        <Button variant={variant} size={size} title={title} rounded={rounded}
                onMouseEnter={() => {
                    setIsHoveringOver(true);
                }}
                onMouseLeave={() => {
                    setIsHoveringOver(false);
                }}
                onClick={onClick}
        >
            {children}
            {active || isHoveringOver ? <SortIcon/> : ""}
        </Button>
    );
};

export interface SortButtonProps {
    variant?: Variant;
    size?: Size;
    /**
     *  button title, corresponds to title on hover
     */
    title?: string;
    /**
     * if true, the button edges are rounded
     */
    rounded?: boolean;
    active?: boolean;
    sortAsc?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    children?: any;
}
