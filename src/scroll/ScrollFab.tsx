import React from "react";
import {useScrollPosition} from "./useScrollPosition.tsx";
import "./assets/fab.css";
import {Button} from "../button/Button.tsx";
import {Icon} from "../icon/Icon.tsx";
import type {Variant} from "../common/Variant.ts";

export const ScrollFab: React.FC<ScrollFabProps> = ({variant = "tertiary"}) => {
    const {isBottom} = useScrollPosition();

    const scrollToTop = () =>
        window.scrollTo({top: 0, behavior: "smooth"});

    const scrollToBottom = () =>
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
        });
    const direction = isBottom ? "up" : "down";
    return (
        <div className="muncher-fab-container">
            <Button variant={variant} onClick={direction === "up" ? scrollToTop : scrollToBottom} rounded={true}>
                {direction === "up" ? <Icon name="arrow-up"/> : <Icon name="arrow-down"/>}
            </Button>
        </div>
    );
}

export interface ScrollFabProps {
    variant?: Variant;
}
