import React, {type RefObject, useCallback, useEffect} from "react";
import type {PieArcDatum} from "d3";
import * as d3 from "d3";
import "./assets/pie-chart.css";
import type {PieChartData} from "./data/PieChartData";

export const PieChart: React.FC<PieChartProps> = (
    {data, withLegend, legendTitle, onClick, valueFormatter, colorRange}) => {
    const chartRef: RefObject<SVGSVGElement | null> = React.createRef();
    const legendRef: RefObject<SVGSVGElement | null> = React.createRef();
    const clickHandler = useCallback((_e: any, d: PieArcDatum<PieChartData>) => {
        if (onClick) {
            onClick(d.index);
        }
    }, [onClick]);


    useEffect(() => {
        const viewBox = "-50 -50 100 100";
        const radius = 50;
        const pie = d3.pie<PieChartData>().padAngle(0.005).sort(null).value(d => d.value);
        const arc = d3.arc<PieArcDatum<PieChartData>>().innerRadius(0).outerRadius(radius - 1);
        const pieData = pie(data);
        const legendText = (data: PieChartData, index: number) => data.legend ? data.legend : data.title + " (" + formatNumber(data.value, index) + ")";
        const formatNumber = (num: number, index: number) => {
            if (valueFormatter) {
                return valueFormatter(num, index);
            } else {
                return num;
            }
        };
        const defaultColorRange = ["#4e79a7", "#59a14f", "#f28e2c", "#e15759", "#261759", "#acd643", "#daf2dc"];
        const color = d3.scaleOrdinal()
            .domain(
                (d3.extent(data, (d) => {
                    return d.title
                }) as unknown) as string
            )
            .range(colorRange ? colorRange : defaultColorRange)
        //.range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse())
        const chart = d3.select(chartRef.current)
            .attr("viewBox", viewBox);
        chart.selectAll("g").remove();
        chart.selectAll("path").remove();
        chart.selectAll("path")
            .data(pieData)
            .join("path")
            .on('click', clickHandler)
            .classed("selected", d => d.data.isSelected)
            .attr("fill", d => color(d.data.title) as string)
            .attr("fill-opacity", 0.9)
            .attr("d", arc)
            .append("title").text((d) => legendText(d.data, d.index));

        chart.append("g")
            .classed("text", true)
            .attr("text-anchor", "middle")
            .selectAll("text")
            .data(pieData)
            .join("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.4).append("tspan")
                .attr("y", "-0.4em")
                .classed("title", true)
                .text(d => d.data.title))
            .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.4).append("tspan")
                .attr("x", 0)
                .attr("y", "0.7em")
                .attr("fill-opacity", 0.7)
                .classed("value", true)
                .text((d) => "(" + formatNumber(d.data.value, d.index) + ")"));
        if (withLegend) {
            const legend = d3.select(legendRef.current).attr("viewBox", "0 0 70 100");
            legend.selectAll("g").remove();
            legend.selectAll("text").remove();
            legend.append("text").text(legendTitle ? legendTitle : "Legend")
                .attr("y", 10)
                .attr("x", 6)
                .classed("legend-title", true);

            const legendGraphics = legend.selectAll("g")
                .data(pieData)
                .enter().append("g");


            legendGraphics.attr("transform", (_d, i) => `translate(6,${i * 10 + 14})`)
                .append("rect")
                .data(pieData)
                .attr("width", 6)
                .attr("height", 6)
                .on('click', clickHandler)
                .classed("legend-rect", true)
                .classed("legend-rect--selected", d => d.data.isSelected)
                .attr("fill", d => color(d.data.title) as string)
                .attr("fill-opacity", 0.9);

            legendGraphics.append("text").data(pieData).text((d) =>
                legendText(d.data, d.index)
            )
                .on('click', clickHandler)
                .classed("legend-text", true)
                .classed("legend-text--selected", d => d.data.isSelected)
                .attr("y", 4)
                .attr("x", 8);

        }

    }, [chartRef, clickHandler, data, legendRef, legendTitle, valueFormatter, withLegend, colorRange]);
    return (
        <div className="muncher-pie-chart">
            <svg ref={chartRef} className="svg-pie-chart"/>
            {withLegend ?
                <svg className="svg-pie-chart-legend" ref={legendRef}>

                </svg>

                : ""}
        </div>

    );

};


export interface PieChartProps {
    data: PieChartData[];
    withLegend?: boolean;
    legendTitle?: string;
    onClick?: (index: number) => void;
    valueFormatter?: (num: number, index: number) => string;
    colorRange?: string[];
}
