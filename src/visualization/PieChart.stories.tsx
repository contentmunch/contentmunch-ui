import type {Meta, StoryFn} from '@storybook/react';
import {useState} from "react";
import {PieChart} from "./PieChart";
import type {PieChartData} from "./data/PieChartData";

const meta = {
    title: 'Visualization/PieChart',
    component: PieChart,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof PieChart>;
export default meta;
type Story = StoryFn<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: Story = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [pieData, setPieData] = useState<PieChartData[]>([
        {title: "First", value: 60, isSelected: true, legend: "First (23: 60%)"},
        {title: "Second", value: 1, isSelected: false},
        {title: "Third", value: 5, isSelected: false},
    ]);
    const handleButtonClicked = () => {
        const currentData = [...pieData];
        currentData[1].value = currentData[1].value === 1 ? 10 : 1;
        setPieData(currentData);
    };
    const handleOnClick = (index: number) => {
        const currentData = [...pieData];
        if (currentData[index].isSelected) {
            currentData[index].isSelected = false;
            setSelectedIndex(-1);
        } else {
            currentData.forEach(value => {
                value.isSelected = false;
            });
            setSelectedIndex(index);
            currentData[index].isSelected = true;
        }
        setPieData(currentData);
    };
    return (
        <>
            <PieChart data={pieData} onClick={handleOnClick} valueFormatter={(num) => {
                return num + "%";
            }} withLegend={true}/>
            <button onClick={handleButtonClicked}>Change Data</button>
            {selectedIndex !== -1 ? <p>Selected: {pieData[selectedIndex].title}</p> : ""}
        </>
    );
};
