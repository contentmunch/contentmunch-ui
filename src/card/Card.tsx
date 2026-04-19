import * as React from "react";
import "./assets/card.css";

export const Card: React.FC<CardProps> = ({children}) => {
    return (
        <div className="muncher-card">
            {children}
        </div>
    );
};

export interface CardProps {
    children: React.ReactNode
}
