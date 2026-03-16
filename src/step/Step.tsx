import React from "react";
import {Badge} from "../badge/Badge";
import "./assets/step.css";
import {Icon} from "../icon/Icon.tsx";

export const Step: React.FC<StepProps> = ({label, active, completed, children}) => {
    return (
        <div className="muncher-step">
            <Badge
                border={completed ? false : !active}
                variant={active ? 'primary' : completed ? 'secondary' : 'transparent'}
                rounded={true}
            >
                {completed ? <Icon name="simple-check"/> : children}
            </Badge>
            <div className="muncher-step--label">{label ? label : <>&nbsp;</>}</div>
        </div>
    );
};

export interface StepProps {
    label?: string;               // label below the badge
    active?: boolean;             // is this the current step?
    completed?: boolean;         // whether to show the line to next step
    children: React.ReactNode;
}
