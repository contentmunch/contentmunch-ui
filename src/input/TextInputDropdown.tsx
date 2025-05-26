import React, {useCallback, useEffect, useRef} from 'react';
import "./assets/text-input-drop-down.css";
import {Input} from "./Input";

export const TextInputDropdown: React.FC<TextInputDropdownProps> = (
    {
        focus = false,
        inputPlaceHolder,
        handleInputChange,
        showContent = false,
        setShowContent,
        readOnly,
        value,
        label,
        error,
        required,
        children
    }) => {
    const ref = useRef(null);

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowContent(true);
        handleInputChange(e.target.value);
    };
    const onContentClose = useCallback(() => {
        setShowContent(false);

    }, [setShowContent]);

    const escFunction = useCallback((event: any) => {
        if (event.keyCode === 27) {
            onContentClose();
        }
    }, [onContentClose]);


    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (ref && ref !== null) {
                const cur: any = ref.current;
                if (cur && !cur.contains(event.target)) {
                    onContentClose();
                }
            }
        }
        document.addEventListener("keydown", escFunction, false);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction, onContentClose]);
    return (
        <div className="muncher-input-drop-down" ref={ref}>
            <Input focus={focus} placeholder={inputPlaceHolder} name="query" onChange={handleQueryChange}
                   readOnly={readOnly} value={value} label={label} required={required} error={error}/>

            {
                showContent ?
                    <div className="muncher-input-drop-down--content">
                        {children}
                    </div> : ""
            }

        </div>

    );
}

export interface TextInputDropdownProps {
    focus?: boolean;
    inputPlaceHolder?: string;
    handleInputChange: (value: string) => void;
    showContent: boolean;
    setShowContent: (b: boolean) => void;
    readOnly?: boolean;
    children?: any;
    value?: any;
    label?: string;
    required?: boolean;
    error?: string;
}
