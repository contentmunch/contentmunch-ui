import type {Meta} from '@storybook/react';
import type {StoryFn} from "@storybook/react";
import {useState} from "react";
import {Pill} from "./Pill";
import {Button} from "../button/Button";

const meta: Meta<typeof Pill> = {
    component: Pill,
    title: 'Data Display/Pill'
};
export default meta;
type Story = StoryFn<typeof meta>;
export const Default: Story = () => {
    const [pills, setPills] = useState(["Pill 1"]);
    const addPills = () => {
        const currentPills = [...pills];
        currentPills.push("Pill " + (currentPills.length + 1));
        setPills(currentPills);
    };
    const removePill = (pill: string) => {
        const currentPills = [...pills];
        const index = currentPills.indexOf(pill);
        currentPills.splice(index, 1);
        setPills(currentPills);
    };
    return (
        <div className="muncher-pill-story">

            <Button variant={"tertiary"} onClick={addPills}>Add pills</Button>
            <br/><br/>
            {pills.map(pill => (
                <Pill key={pill} pillCloseHandler={() => removePill(pill)}>{pill}</Pill>
            ))}

        </div>
    );
}
