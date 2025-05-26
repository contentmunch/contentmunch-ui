import React from "react";
import "./assets/ul.css";

export const Ul: React.FC<UlProps> = ({children}) => {
    return (<ul className="muncher-ul">{children}</ul>);

}

export interface UlProps {
    children?: any
}
