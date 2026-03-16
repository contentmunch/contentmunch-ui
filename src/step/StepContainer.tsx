import React from "react";
import "./assets/step-container.css";

export const StepContainer: React.FC<StepContainerProps> = ({children}) => {
    return (
        <div className="muncher-step--container">
            {children}
        </div>
    );
};

export interface StepContainerProps {      // whether to show the line to next step
    children: React.ReactNode;
}
