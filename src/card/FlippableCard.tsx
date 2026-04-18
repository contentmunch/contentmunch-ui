import * as React from "react";
import {motion} from "framer-motion";
import "./assets/flippable-card.css";

export const FlippableCard = ({flipped, setFlipped, front, back}: {
    flipped: boolean,
    setFlipped: (flag: boolean) => void,
    front: React.ReactNode,
    back: React.ReactNode
}) => {


    return (
        <motion.div
            className={`flippable-card  ${flipped ? "flipped" : ""}`}
            onClick={() => setFlipped(!flipped)}
            whileHover={{scale: 1.02}}
        >
            <div className="card-face front">
                <div className="card-content-scrollable">
                    {front}
                </div>
            </div>
            <div className="card-face back">
                <div className="card-content-scrollable">
                    {back}
                </div>
            </div>
        </motion.div>
    );
};
