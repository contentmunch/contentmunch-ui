import type {Meta, StoryObj} from "@storybook/react";
import type * as React from "react";
import {useState} from "react";
import {BarChart} from "./BarChart.tsx";
import {DonutChart} from "./DonutChart.tsx";
import {KpiChart} from "./KpiChart.tsx";
import {LineChart} from "./LineChart.tsx";
import {TableChart} from "./TableChart.tsx";
import {periodsOf, formatPeriod} from "./dataset/derive.ts";
import {dailyVisits, funnelByMonth, monthlyRevenue, quarterlyRevenue, spendingOverTime, twoMonths, yearlyByChannel} from "./fixtures.ts";

const meta: Meta = { title: "Visualization/Time series" };
export default meta;
type Story = StoryObj;

const Block = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section style={{ marginBottom: "2rem" }}>
        <h4 style={{ margin: "0 0 .5rem" }}>{title}</h4>
        {children}
    </section>
);

/** The month grain: one measure over eight months. */
export const Monthly: Story = { render: () => <LineChart data={monthlyRevenue}/> };

/** The day grain: a line drawn day by day. The 12th and 13th have no data, so the line breaks there instead of skipping them. */
export const DailyWithAGap: Story = { render: () => <LineChart data={dailyVisits} size="large"/> };

/** The quarter grain: labelled Q1 2024, Q2 2024, and so on. The last quarter of 2026 has no data yet. */
export const Quarterly: Story = { render: () => <LineChart data={quarterlyRevenue}/> };

/** The year grain, one line for each value of a category, in colors that were chosen for them. */
export const YearlyByCategory: Story = { render: () => <LineChart data={yearlyByChannel}/> };

/** Several measures, each its own line, with the legend the donut has. */
export const SeveralMeasures: Story = { render: () => <LineChart data={funnelByMonth}/> };

/** A KPI reads the same data: the latest value, the change from the month before, and its history. */
export const KpiFromTheSameData: Story = { render: () => <KpiChart data={monthlyRevenue}/> };

/** One dataset, four drawings. Nothing about the data changes between them. */
export const OneDatasetFourWays: Story = {
    render: () => (
        <>
            <Block title="Line"><LineChart data={monthlyRevenue}/></Block>
            <Block title="KPI"><KpiChart data={monthlyRevenue}/></Block>
            <Block title="Table"><TableChart data={monthlyRevenue}/></Block>
        </>
    ),
};

/** Two periods of the same measure, compared bar against bar. */
export const TwoPeriodsAsBars: Story = { render: () => <BarChart data={twoMonths}/> };

const Stepper = () => {
    const periods = periodsOf(spendingOverTime);
    const [index, setIndex] = useState(periods.length - 1);
    return (
        <>
            <div style={{ display: "flex", gap: ".5rem", alignItems: "center", marginBottom: "1rem" }}>
                <button type="button" disabled={index === 0} onClick={() => setIndex(index - 1)}>Earlier</button>
                <strong>{formatPeriod(periods[index], "month")}</strong>
                <button type="button" disabled={index === periods.length - 1} onClick={() => setIndex(index + 1)}>Later</button>
            </div>
            <DonutChart data={spendingOverTime} period={periods[index]}/>
            <div style={{ marginTop: "2rem" }}><LineChart data={spendingOverTime}/></div>
        </>
    );
};

/** The app steps through time with `period`: a donut shows one month at a time while the line shows all of them. */
export const SteppingThroughTime: Story = { render: () => <Stepper/> };
