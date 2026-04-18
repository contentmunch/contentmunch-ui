import * as React from "react";
import {motion} from "framer-motion";
import "./assets/flippable-card.css";


export const FlippableCard: React.FC<FlippableCardProps> = ({flipped, setFlipped, front, back}) => {

    return (
        <motion.div
            className={`muncher-flippable-card  ${flipped ? "flipped" : ""}`}
            onClick={() => setFlipped(!flipped)}
            whileHover={{scale: 1.02}}
        >
            <div className="muncher-flippable-card-face front">
                <div className="muncher-card-content-scrollable">
                    {front}
                </div>
            </div>
            <div className="muncher-flippable-card-face back">
                <div className="muncher-flippable-card-content-scrollable">
                    {back}
                </div>
            </div>
        </motion.div>
    );
};

export interface FlippableCardProps {
    flipped: boolean,
    setFlipped: (flag: boolean) => void,
    front: React.ReactNode,
    back: React.ReactNode
}
