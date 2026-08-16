import React, {useState} from 'react';
import {Button} from "./Button";
import {Icon} from "../icon/Icon";
import {copyToClipboard} from "../utils/Utils";
import type {IconName} from "../icon/Drawings";
import type {Variant} from "../common/Variant.ts";
import type {Size} from "../common/Size.ts";

export const CopyButton: React.FC<CopyButtonProps> = (
    {
        text, variant = 'secondary', size = 'small', label = 'copy link'
    }) => {
    const [color, setColor] = useState<string>();
    const [name, setName] = useState<IconName>("copy");
    const [title, setTitle] = useState<string>(label);
    const copyButtonClicked = () => {
        copyToClipboard(text);
        setColor("green");
        setName("check");
        setTitle("copied!");
        setTimeout(function () {
            setColor("");
            setName("copy");
            setTitle(label);
        }, 2000);

    }
    return (


        <Button size={size} variant={variant} title={title}
                onClick={copyButtonClicked}>
            <Icon name={name} color={color}/>
        </Button>

    );
};

export interface CopyButtonProps {
    variant?: Variant;
    size?: Size;
    text: string;
    /** Tooltip shown before copying, e.g. "copy code" for a code block; defaults to "copy link". */
    label?: string;
}

