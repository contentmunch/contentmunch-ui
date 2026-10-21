import * as React from "react";
import type {Color} from "../dataset/Dataset.ts";
import {colorHex} from "../dataset/colors.ts";

export interface LegendItem {
    key: string;
    label: string;
    color: Color;
}

/** The legend the donut has always had: a small title, then a swatch and a name for each series. */
export const Legend: React.FC<{ title?: string; items: LegendItem[] }> = ({ title, items }) => (
    <ul className="muncher-viz-legend">
        {title && <li className="muncher-viz-legend-title">{title}</li>}
        {items.map((item) => (
            <li key={item.key} className="muncher-viz-legend-item">
                <span className="muncher-viz-legend-swatch" style={{ backgroundColor: colorHex(item.color) }} aria-hidden="true"/>
                <span className="muncher-viz-legend-text">{item.label}</span>
            </li>
        ))}
    </ul>
);
