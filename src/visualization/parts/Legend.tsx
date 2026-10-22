import * as React from "react";
import type {Color} from "../dataset/Dataset.ts";
import {colorHex} from "../dataset/colors.ts";

export interface LegendItem {
    key: string;
    label: string;
    color: Color;
}

/** The legend the donut has always had: a small title, then a swatch and a name for each series. */
/** `inset` (0 to 1) is how far in from the left the plot starts, so the legend lines up with its axis. */
export const Legend: React.FC<{ title?: string; items: LegendItem[]; inset?: number }> = ({ title, items, inset }) => (
    <ul className="muncher-viz-legend" style={inset ? { paddingLeft: `${(inset * 100).toFixed(2)}%` } : undefined}>
        {title && <li className="muncher-viz-legend-title">{title}</li>}
        {items.map((item) => (
            <li key={item.key} className="muncher-viz-legend-item">
                <span className="muncher-viz-legend-swatch" style={{ backgroundColor: colorHex(item.color) }} aria-hidden="true"/>
                <span className="muncher-viz-legend-text">{item.label}</span>
            </li>
        ))}
    </ul>
);
