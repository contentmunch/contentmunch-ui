import React from "react";
import {useScrollPosition} from "./useScrollPosition.tsx";
import "./assets/fab.css";
import {Button} from "../button/Button.tsx";
import {Icon} from "../icon/Icon.tsx";
import type {Variant} from "../common/Variant.ts";

const MIN_SHOW_AFTER_PX = 500;

export const ScrollFab: React.FC<ScrollFabProps> = ({variant = "tertiary"}) => {
    const {scrollTop} = useScrollPosition();

    const scrollToTop = () =>
        window.scrollTo({top: 0, behavior: "smooth"});

    const showThreshold = Math.max(MIN_SHOW_AFTER_PX, window.innerHeight / 2);

    if (scrollTop < showThreshold) return null;

    return (
        <div className="muncher-fab-container">
            <Button variant={variant} onClick={scrollToTop} rounded={true}>
                <Icon name="chevron-up"/>
            </Button>
        </div>
    );
}

export interface ScrollFabProps {
    variant?: Variant;
}
