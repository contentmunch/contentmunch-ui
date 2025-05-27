import React from 'react';
import './assets/star.css';

export const Star: React.FC<StarProps> = ({rating, color, size, ...props}) => {

    const style: any = {
        '--r': rating
    }
    const className = () => {
        let starClassName = "muncher-star";
        if (color) {
            starClassName += " star-" + color;
        }
        if (size) {
            starClassName += " star-" + size;
        }
        return starClassName;
    };
    return (
        <span className={className()} style={style} {...props} />
    )
};

export interface StarProps {
    rating: number;
    color?: 'green' | 'yellow' | 'orange' | 'red' |'blue';
    size?: 'small' | 'medium' | 'large';
}
