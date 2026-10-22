import type {Meta, StoryObj} from "@storybook/react";
import type * as React from "react";
import {useState} from "react";
import {BarChart} from "./BarChart.tsx";
import {DonutChart} from "./DonutChart.tsx";
import {KpiChart} from "./KpiChart.tsx";
import {LineChart} from "./LineChart.tsx";
import {PieChart} from "./PieChart.tsx";
import {TimeSlider} from "./TimeSlider.tsx";
import {latestPeriod} from "./dataset/derive.ts";
import type {Dataset, VisualizationSize} from "./dataset/Dataset.ts";
import {monthlyRevenue, regionalSales} from "./fixtures.ts";

const meta: Meta = { title: "Visualization/Time slider", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

/** One slider and whatever it drives. The slider only reports the period; the charts are given it. */
const Player = ({ data, children, start, align, size }: { data: Dataset; start?: string; align?: "start" | "center"; size?: VisualizationSize; children: (period: string) => React.ReactNode }) => {
    const [period, setPeriod] = useState<string>(start ?? latestPeriod(data) ?? "");
    return (
        <>
            <TimeSlider data={data} period={period} onPeriod={setPeriod} align={align} size={size}/>
            {children(period)}
        </>
    );
};

/** Shares that change over time are what a pie or donut shows best: press play and watch the parts trade places. */
export const Donut: Story = { render: () => <Player data={regionalSales} start="2026-01" align="center">{(p) => <DonutChart data={regionalSales} period={p}/>}</Player> };
export const Pie: Story = { render: () => <Player data={regionalSales} start="2026-01" align="center">{(p) => <PieChart data={regionalSales} period={p}/>}</Player> };

/** The bars keep the same regions in the same places and the axis does not move, so a change in length is a change in value. */
export const Bars: Story = { render: () => <Player data={regionalSales} start="2026-01" size="large">{(p) => <BarChart data={regionalSales} period={p} size="large"/>}</Player> };

/** A KPI follows the slider: the value for the month, the change from the month before, and the history so far. */
export const Kpi: Story = { render: () => <Player data={monthlyRevenue} start="2026-03">{(p) => <KpiChart data={monthlyRevenue} period={p}/>}</Player> };

/** A line shows every period and marks the one being played with a cursor and its values. */
export const LineWithCursor: Story = { render: () => <Player data={regionalSales} start="2026-01">{(p) => <LineChart data={regionalSales} period={p}/>}</Player> };

/** One slider for the whole page: a donut, bars and a line all showing the same month. */
export const OnePageOneSlider: Story = {
    render: () => (
        <Player data={regionalSales} start="2026-01">
            {(p) => (
                <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", alignItems: "start" }}>
                    <DonutChart data={regionalSales} period={p}/>
                    <BarChart data={regionalSales} period={p}/>
                    <div style={{ gridColumn: "1 / -1" }}><LineChart data={regionalSales} period={p}/></div>
                </div>
            )}
        </Player>
    ),
};

/** Faster, for a long series. */
export const FasterPlayback: Story = {
    render: () => {
        const Fast = () => {
            const [period, setPeriod] = useState("2026-01");
            return (<><TimeSlider data={regionalSales} period={period} onPeriod={setPeriod} intervalMs={400} align="center"/><DonutChart data={regionalSales} period={period}/></>);
        };
        return <Fast/>;
    },
};
