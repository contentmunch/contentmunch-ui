import React, {useCallback, useEffect, useRef} from 'react';
import './assets/drop-down-button.css';
import {Button, type ButtonProps} from "./Button";

export const DropdownButton: React.FC<DropdownButtonProps> = (
    {
        variant, size = 'medium', title, active,
        disabled, element, onMouseDown,
        rounded, drop, onClick, onClose,
        showContent, setShowContent, withDropIcon, children, ...props
    }) => {

    const dropDownRef = useRef<HTMLDivElement>(null);
    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (onClick) onClick(e);
        if (setShowContent) setShowContent(true);

    }

    const handleContentClose = useCallback(() => {
        setShowContent(false);
        if (onClose) onClose();

    }, [onClose, setShowContent]);
    const escFunction = useCallback((event: any) => {
        if (event.keyCode === 27) handleContentClose();
    }, [handleContentClose]);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropDownRef && dropDownRef.current) {
                if (event.target instanceof HTMLElement && !dropDownRef.current.contains(event.target)) {
                    handleContentClose();
                }
            }
        };
        document.addEventListener("keydown", escFunction, false);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction, handleContentClose]);
    const dropdownClass = () => {
        const offsetLeft = dropDownRef.current?.offsetLeft;
        const windowWidth = window.innerWidth;

        if (offsetLeft) {
            if (offsetLeft < 100) return "muncher-dropdown--content";
            if (windowWidth - offsetLeft < 150) return "muncher-dropdown--content drop-left";
            if (windowWidth - offsetLeft < 250) {
                const offsetPercent = Math.round((windowWidth - offsetLeft) / windowWidth * 100);
                if (offsetPercent > 40 || offsetPercent < 60) return "muncher-dropdown--content drop-middle";
            }
        }
        switch (drop) {
            case "left":
                return "muncher-dropdown--content drop-left";
            case "middle":
                return "muncher-dropdown--content drop-middle";
            default:
                return "muncher-dropdown--content";
        }
    };

    return (
        <div className="muncher-dropdown" ref={dropDownRef}>
            <Button onMouseDown={handleMouseDown} title={title}
                    disabled={disabled} rounded={rounded}
                    active={active} variant={variant} size={size} {...props}
            >{element}{withDropIcon ? <span
                className="small">▼</span> : ""}</Button>
            {
                showContent ? <div className={dropdownClass()}>
                    {children}
                </div> : ""
            }
        </div>
    );
};


export interface DropdownButtonProps extends ButtonProps {
    /**
     * base on drop value, it will either drop left or right
     */
    drop?: 'left' | 'right' | 'middle';
    /**
     * shows or hides drop down content
     */
    showContent: boolean;
    /**
     * event to set show content value
     */
    setShowContent: (show: boolean) => void;

    /**
     * button mouse down handler
     */
    onClose?: () => void;
    element: React.ReactNode;
    withDropIcon?: boolean;

}
