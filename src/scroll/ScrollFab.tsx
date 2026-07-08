import React from "react";
import {useScrollPosition} from "./useScrollPosition.tsx";
import "./assets/fab.css";
import {Button} from "../button/Button.tsx";
import {Icon} from "../icon/Icon.tsx";
import type {Variant} from "../common/Variant.ts";

export const ScrollFab: React.FC<ScrollFabProps> = ({variant = "tertiary"}) => {
    const {isTop} = useScrollPosition();

    const scrollToTop = () =>
        window.scrollTo({top: 0, behavior: "smooth"});

    const scrollToBottom = () =>
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
        });

    // At the top: only down makes sense.
    // Anywhere else (including the exact middle): up is the more useful default,
    // since "jump back to start" is the more common intent once you've scrolled any distance.
    const direction = isTop ? "down" : "up";

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
