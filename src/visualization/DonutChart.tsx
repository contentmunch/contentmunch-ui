import * as React from "react";
import type {DonutChartData} from "./data/DonutChartData.ts";
import "./assets/donut-chart.css";
import {buildDonutSlices} from "./utils/DonutSlice.ts";

const DEFAULT_COLOR_RANGE = ["#4e79a7", "#59a14f", "#f28e2c", "#e15759", "#261759", "#acd643", "#daf2dc"];
const DEFAULT_SIZE = 220;
const DEFAULT_INNER_RADIUS_RATIO = 0.62;

export const DonutChart: React.FC<DonutChartProps> = (
    {
        data, selected, onSelect,
        centerLabel, centerValue,
        valueFormatter, colorRange,
        size = DEFAULT_SIZE, innerRadiusRatio = DEFAULT_INNER_RADIUS_RATIO,
        withLegend, legendTitle,
    }
) => {
    const palette = colorRange ?? DEFAULT_COLOR_RANGE;
    const center = size / 2;
    const outerRadius = size / 2;
    const innerRadius = outerRadius * innerRadiusRatio;

    const resolved = data.map((d, index) => ({
        title: d.title,
        value: d.value,
        color: d.color ?? palette[index % palette.length],
    }));
    const slices = buildDonutSlices(resolved, center, center, outerRadius, innerRadius);

    const formatValue = (num: number, index: number) => valueFormatter ? valueFormatter(num, index) : String(num);
    const legendText = (slice: {
        title: string;
        value: number;
        percent: number
    }, index: number, sourceLegend?: string) =>
        sourceLegend ? sourceLegend : `${slice.title} (${formatValue(slice.value, index)})`;

    return (
        <div className="muncher-donut-chart">
            <div className="muncher-donut-chart-graphic" style={{width: size, height: size}}>
                <svg viewBox={`0 0 ${size} ${size}`} className="muncher-donut-chart-svg">
                    {slices.map((slice, index) => (
                        <path
                            key={slice.title}
                            d={slice.path}
                            fill={slice.color}
                            className={"muncher-donut-slice" + (selected === slice.title ? " is-selected" : "")}
                            onClick={() => onSelect?.(slice.title)}
                        >
                            <title>{legendText(slice, index, data[index]?.legend) + ` -- ${(slice.percent * 100).toFixed(0)}%`}</title>
                        </path>
                    ))}
                </svg>
                {(centerLabel || centerValue) &&
                    <div className="muncher-donut-chart-center">
                        {centerLabel && <span className="muncher-donut-chart-center-label">{centerLabel}</span>}
                        {centerValue && <span className="muncher-donut-chart-center-value">{centerValue}</span>}
                    </div>
                }
            </div>
            {withLegend &&
                <ul className="muncher-donut-chart-legend">
                    {legendTitle && <li className="muncher-donut-chart-legend-title">{legendTitle}</li>}
                    {slices.map((slice, index) => (
                        <li
                            key={slice.title}
                            className={"muncher-donut-chart-legend-item" + (selected === slice.title ? " is-selected" : "")}
                            onClick={() => onSelect?.(slice.title)}
                        >
                            <span className="muncher-donut-chart-legend-swatch" style={{backgroundColor: slice.color}}/>
                            <span className="muncher-donut-chart-legend-text">
                                {legendText(slice, index, data[index]?.legend)}
                            </span>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
};

export interface DonutChartProps {
    data: DonutChartData[];
    selected?: string | null;
    onSelect?: (title: string) => void;
    centerLabel?: string;
    centerValue?: string;
    valueFormatter?: (num: number, index: number) => string;
    colorRange?: string[];
    /**
     * pixel size of the svg viewBox (square); defaults to 220, same as the
     * original fixed-size version
     */
    size?: number;
    /**
     * inner radius as a fraction of the outer radius, 0-1; defaults to .62
     */
    innerRadiusRatio?: number;
    withLegend?: boolean;
    legendTitle?: string;
}
