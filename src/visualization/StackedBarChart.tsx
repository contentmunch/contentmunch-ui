import React, {type RefObject, useCallback, useEffect} from "react";
import * as d3 from "d3";
import "./assets/stacked-bar-chart.css";
import type {FieldValue, StackedBarChartData} from "./data/StackedBarChartData";

export const StackedBarChart: React.FC<BarChartProps> = (
    {data, comparisonData, colorRange, toPercentage, withLegend, showOnlyValues}) => {
    const svgRef: RefObject<SVGSVGElement | null> = React.createRef();
    const legendRef: RefObject<SVGSVGElement | null> = React.createRef();
    const draw = useCallback(() => {

        const combineData = (): StackedBarChartData => {
            const combinedData: StackedBarChartData = {} as StackedBarChartData;
            combinedData.totalField = data.totalField;
            combinedData.titleField = data.titleField;
            combinedData.stackFields = data.stackFields;
            const extractPostfix = (titleSeparator: string, value?: string | number): string => {
                if (value) {
                    const titleArray = value.toString().split(titleSeparator);
                    return titleArray.length > 1 ? titleArray[1] : "*";
                }
                return "*";
            };
            const extractTitle = (titleSeparator: string, value?: string | number): string | null => {
                return value ? value.toString().split(titleSeparator)[0] : null;
            };
            if (comparisonData) {

                combinedData.values = [];
                let lastPostFix = "*";
                let emptyCount = 0;
                data.values.forEach((value, index) => {
                    combinedData.values.push(value);
                    if (data.titleSeparator) {
                        const compareIndex = index - emptyCount;
                        const referenceTitle = extractTitle(data.titleSeparator, value[data.titleField]);
                        const title = comparisonData.values[compareIndex] ? extractTitle(data.titleSeparator, comparisonData.values[compareIndex][data.titleField]) : null;

                        if (referenceTitle === title) {
                            combinedData.values.push(comparisonData.values[compareIndex]);
                            lastPostFix = extractPostfix(data.titleSeparator, comparisonData.values[compareIndex][data.titleField]);
                        } else {
                            const titleFieldValue: FieldValue = {};
                            titleFieldValue[combinedData.titleField] = referenceTitle + data.titleSeparator + lastPostFix;
                            combinedData.values.push(titleFieldValue);
                            emptyCount++;
                        }

                    } else {
                        if (comparisonData.values[index])
                            combinedData.values.push(comparisonData.values[index]);
                    }

                });
            } else {
                combinedData.values = data.values;
            }
            return combinedData;
        }

        const barData = combineData();
        if (barData && barData.values && barData.values.length > 0) {
            const barHeight = comparisonData ? 20 : 30;
            const siblingGap = 3;
            const margin = {top: 0, right: 10, bottom: 40, left: comparisonData ? 150 : 110};
            const viewBoxWidth = 580;
            const viewBox = `0 0 ${viewBoxWidth} ${barData.values.length * (barHeight) + 20}`;

            const height = barData.values.length * barHeight;
            const width = viewBoxWidth - margin.left - margin.right;
            const defaultColorRange = ["#4e79a7", "#59a14f", "#f28e2c", "#e15759", "#261759", "#acd643", "#daf2dc"];
            const numberToPercent = (d: number, total: number) => toPercentage ? d / total * 100 : d;
            const percentToNumber = (percent: number, total: number) => toPercentage ? (percent * total / 100).toFixed(0) : percent;
            const fieldTotal = (fieldValue: FieldValue): number => {
                if (toPercentage) {
                    let percentTotal: number = 0;
                    barData.stackFields.forEach(field => {
                        percentTotal += numberToPercent(+fieldValue[field], +fieldValue[barData.totalField]);
                    });
                    return percentTotal;
                } else
                    return +fieldValue[barData.totalField];
            };
            const formatData = (num: number): string => toPercentage ? num.toFixed(0) + "%" : num.toString();
            const maxValue = (): number => {
                const max = d3.max(barData.values, d => fieldTotal(d));
                return max === undefined ? 0 : +max.toFixed(0);
            };
            const stackData = d3.stack<any>().keys(barData.stackFields)
                .value((d, key) => {
                    return numberToPercent(d[key], d[barData.totalField]);
                });

            const y = d3.scaleBand()
                .rangeRound([0, height])
                .paddingInner(0.2)
                .align(0.1)
                .domain(barData.values.map(d => d[barData.titleField] as string));

            const x = d3.scaleLinear()
                .rangeRound([0, width])
                .domain([0, maxValue()]).nice();

            const z = d3.scaleOrdinal()
                .range(colorRange ? colorRange : defaultColorRange)
                .domain(barData.stackFields);

            const colorToStackField = (color: string | undefined | null): string => {
                if (color === undefined || color === null) return "";
                const index = colorRange ? colorRange.findIndex(value => value === color) : defaultColorRange.findIndex(value => value === color);
                return index > -1 && index < barData.stackFields.length ? barData.stackFields[index] : "";
            }

            const svg = d3.select(svgRef.current)
                .attr("viewBox", viewBox);

            svg.selectAll("g").remove();

            const barChart = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

            const g = barChart.append("g")
                .selectAll("g")
                .data(stackData(barData.values))
                .join("g")
                .attr("fill-opacity", 0.9);

            const fill = g.attr("fill", d => z(d.key) as string);

            const bar = fill.selectAll("rect")
                .data(d => d)
                .enter();

            bar.append("rect")
                .classed("bar-rectangle", true)
                .attr("y", (d, i) => {
                    return y(d.data[barData.titleField]) as number - (comparisonData && i % 2 === 1 ? siblingGap : 0);
                })
                .attr("x", d => x(d[0]))
                .attr("width", d => x(d[1]) - x(d[0]))
                .attr("height", y.bandwidth())
                .append("title").text((d, i, group) => {
                const fillColor = group[i].parentNode?.parentElement?.getAttribute("fill");
                const stackField = colorToStackField(fillColor);
                const value = d[1] - d[0];

                return showOnlyValues ? `${stackField}: ${percentToNumber(value, d.data[barData.totalField])}` :
                    `${stackField}: ${toPercentage ? formatData(value) : ""} (${percentToNumber(value, d.data[barData.totalField])} of ${d.data[barData.totalField]})`;
            });
            bar.append("text")
                .text((d, _i, _group) => {
                    const value = d[1] - d[0];
                    const width = x(d[1]) - x(d[0]);
                    const percentText = showOnlyValues ? `${percentToNumber(value, d.data[barData.totalField])}` :
                        `${formatData(value)} (${percentToNumber(value, d.data[barData.totalField])} of ${d.data[barData.totalField]})`;


                    const numberText = `${value} of ${d.data[barData.totalField]}`;
                    const minWidthForPercentText = 50;
                    if (toPercentage)
                        return width > minWidthForPercentText ? percentText : "";
                    const minWidthForText = 30;
                    return width > minWidthForText ? numberText : "";
                })
                .classed("bar-text", true)
                .attr("y", (d, i) => {
                    return y(d.data[barData.titleField]) as number + barHeight / 2 - (comparisonData && i % 2 === 1 ? siblingGap : 0);
                })
                .attr("text-anchor", "end")
                .attr("x", d => {
                    const width = x(d[1]) - x(d[0]);
                    return x(d[0]) + width - 5;
                });

            barChart.append("g")
                .attr("class", "axis")
                .attr("transform", () => {

                    return `translate(0,0)`;
                })
                .call(d3.axisLeft(y).tickSizeOuter(0));
            if (!showOnlyValues) {
                barChart.append("g")
                    .attr("class", "axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x).tickFormat(x => formatData(x.valueOf())));
            }


            if (withLegend) {

                const legendViewBox = `0 0 45 ${barData.stackFields.length * 8}`;
                const chartLegend = d3.select(legendRef.current).attr("viewBox", legendViewBox);
                chartLegend.selectAll("g").remove();
                chartLegend.selectAll("text").remove();

                chartLegend.attr("text-anchor", "end");
                const legend = chartLegend.selectAll("g")
                    .data(barData.stackFields.slice())
                    .join("g")
                    .attr("transform", (_d, i) => "translate(" + margin.right + "," + (i * 7) + ")");


                legend.append("rect")
                    .attr("fill-opacity", 0.9)
                    .attr("x", 28)
                    .attr("width", 6)
                    .attr("height", 6)
                    .attr("fill", d => z(d) as string);

                legend.append("text")
                    .attr("x", 26)
                    .attr("dy", "0.24rem")
                    .text(d => d);
            }
        }


    }, [svgRef, legendRef, data, colorRange, toPercentage, comparisonData, withLegend]);

    useEffect(() => {
        draw();
    }, [draw]);
    return (
        <div className="muncher-bar-chart">
            <svg ref={svgRef} className="svg-bar-chart"/>
            {withLegend ?
                <svg className="svg-bar-chart-legend" ref={legendRef}>

                </svg>

                : ""}
        </div>
    );

};


export interface BarChartProps {
    data: StackedBarChartData;
    comparisonData?: StackedBarChartData;
    toPercentage?: boolean;
    colorRange?: string[];
    withLegend?: boolean;
    showOnlyValues?: boolean;
}
