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
/**
 * With `onFocus` the entries answer the pointer: hovering one shows that series alone for as long as the pointer is on it, and clicking
 * (or Enter) holds it until it is clicked again. `focus` is the series being shown alone, if any. Nothing is stored.
 */
export const Legend: React.FC<{
    title?: string; items: LegendItem[]; inset?: number;
    focus?: string | null; held?: string | null; onHover?: (key: string | null) => void; onHold?: (key: string | null) => void;
}> = ({ title, items, inset, focus, held, onHover, onHold }) => (
    <ul className="muncher-viz-legend" style={inset ? { paddingLeft: `${(inset * 100).toFixed(2)}%` } : undefined}>
        {title && <li className="muncher-viz-legend-title">{title}</li>}
        {items.map((item) => (
            <li key={item.key}
                className={`muncher-viz-legend-item${onHold ? " muncher-viz-legend-item--pickable" : ""}${held === item.key ? " muncher-viz-legend-item--held" : ""}${focus && focus !== item.key ? " muncher-viz-legend-item--dim" : ""}`}
                {...(onHold ? {
                    role: "button", tabIndex: 0, "aria-pressed": held === item.key,
                    onMouseEnter: () => onHover?.(item.key), onMouseLeave: () => onHover?.(null),
                    onFocus: () => onHover?.(item.key), onBlur: () => onHover?.(null),
                    onClick: () => onHold(held === item.key ? null : item.key),
                    onKeyDown: (e: React.KeyboardEvent) => {
                        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onHold(held === item.key ? null : item.key); }
                    },
                } : {})}>
                <span className="muncher-viz-legend-swatch" style={{ backgroundColor: colorHex(item.color) }} aria-hidden="true"/>
                <span className="muncher-viz-legend-text">{item.label}</span>
            </li>
        ))}
    </ul>
);
