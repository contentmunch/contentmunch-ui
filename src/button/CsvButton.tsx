import React from "react";
import {type AllButtonProps, Button} from "./Button";
import {Icon} from "../icon/Icon";
import "./assets/csv-button.css";

export const CsvButton: React.FC<CsvButtonProps> = (
    {
        header, data, filename,
        variant, size, title,
        active, disabled, rounded
    }) => {
    const csv = encodeURI("data:text/csv;charset=utf-8,"
        + header.join(",") + "\n"
        + data.map(row => row.join(",")).join("\n"));
    return (
        <div className="muncher-csv">
            <Button variant={variant} size={size} active={active} disabled={disabled} rounded={rounded}>
                <a href={csv} download={filename + ".csv"}>
                    <Icon name="download">{title ? title : "Download"}</Icon>
                </a>
            </Button>
        </div>
    );
};

export interface CsvButtonProps extends AllButtonProps {
    header: string[];
    data: string[][];
    filename: string;
}
