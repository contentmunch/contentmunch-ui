import React, {type ReactNode, useState} from "react";
import "./assets/accordion.css";
import type {Variant} from "../button/Button";


export const Accordion: React.FC<AccordionProps> = ({variant, children}) => {
    const {folds} = children;
    const [currentIndex, setCurrentIndex] = useState(0);

    const foldClass = (index: number) => index === currentIndex
        ? "fold active" : "fold";
    const buttonClass = (index: number) => 'fold-button' +
        (variant ? ' fold-button--' + variant : '') +
        (folds[index].foldColor ? ' fold-button--primary fold-button--' + folds[index].foldColor : '');

    const handleButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {

        const key = event.which.toString();
        const ctrlModifier = (event.ctrlKey && key.match(/33|34/));

        if (key.match(/38|40/) || ctrlModifier) {
            const direction = (key.match(/34|40/)) ? 1 : -1;
            const length = folds.length;
            const newIndex = (currentIndex + length + direction) % length;
            setCurrentIndex(newIndex);
        } else {
            // 36 = Home key
            if (key === '36') {
                setCurrentIndex(0);
            }
            // 35 = End key
            if (key === '35') {
                setCurrentIndex(folds.length - 1);
            }
        }
        event.preventDefault();
    };
    return (
        <div className="muncher-accordion">
            {folds.map((fold, index) =>
                <div key={"muncher-accordion-fold-" + index} className={foldClass(index)}
                     aria-expanded={currentIndex === index}>
                    <button className={buttonClass(index)}
                            onKeyDown={handleButtonKeyDown}
                            onClick={() => setCurrentIndex(index)}>
                        <span>{fold.heading}</span>
                    </button>
                    <section className="fold-content">
                        {fold.body}
                    </section>
                </div>
            )}
        </div>
    );
}

export interface AccordionProps {

    children: {
        /**
         * Folds for accordion
         */
        folds: Fold[]
    };
    /**
     * Variant for fold button
     */
    variant?: Variant;
}

export interface Fold {
    heading: string,
    body: ReactNode
    foldColor?: "maroon" | "purple" | "green" | "blue" | "orange"
}
