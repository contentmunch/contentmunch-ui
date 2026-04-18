import * as React from "react";
import "./assets/card.css";

export const Card: React.FC<CardProps> = ({children}) => {
    return (
        <div className="muncher-card">
            <div className="muncher-card--face">
                <div className="muncher-card-content--scrollable">
                    {children}
                </div>
            </div>

        </div>
    );
};

export interface CardProps {
    children: React.ReactNode
}
