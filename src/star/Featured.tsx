import React from "react";
import "./assets/featured.css";

export const Featured: React.FC<FeaturedProps> = ({isFeatured, onClick}) => {

    return (
        <span className="span-featured">
            <span className={isFeatured ? "featured-star" : "un-featured-star"} onClick={onClick}>

            </span>
        </span>
    );
}

export interface FeaturedProps {
    isFeatured: boolean;
    onClick: () => void;
}
