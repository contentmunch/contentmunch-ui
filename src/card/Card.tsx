import * as React from "react";
import "./assets/card.css";

export const Card: React.FC<CardProps> = ({children}) => {
    return (
        <div className="card">
            <div className="face">
                <div className="card-content-scrollable">
                    {children}
                </div>
            </div>

        </div>
    );
};

export interface CardProps {
    children: React.ReactNode
}
