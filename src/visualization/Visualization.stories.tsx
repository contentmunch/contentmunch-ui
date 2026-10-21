import type {Meta, StoryObj} from "@storybook/react";
import {useState} from "react";
import {Visualization} from "./Visualization.tsx";
import {fitting, KIND_LABELS} from "./registry.ts";
import {leaseTypes, monthlyRevenue, spending} from "./fixtures.ts";
import type {Dataset} from "./dataset/Dataset.ts";

const meta: Meta<typeof Visualization> = { title: "Visualization/One dataset, any kind", component: Visualization };
export default meta;
type Story = StoryObj<typeof Visualization>;

/** Change the kind with the list: the data stays as it is. The list holds only the kinds that can draw it. */
const Picker = ({ data }: { data: Dataset }) => {
    const kinds = fitting(data);
    const [kind, setKind] = useState(kinds[0]);
    return (
        <>
            <label>
                Type{" "}
                <select value={kind} onChange={(e) => setKind(e.target.value as typeof kind)}>
                    {kinds.map((k) => <option key={k} value={k}>{KIND_LABELS[k]}</option>)}
                </select>
            </label>
            <div style={{ marginTop: "1rem" }}><Visualization kind={kind} data={data}/></div>
        </>
    );
};

export const ShareOfAWhole: Story = { render: () => <Picker data={leaseTypes}/> };
export const Spending: Story = { render: () => <Picker data={spending}/> };
export const OverTime: Story = { render: () => <Picker data={monthlyRevenue}/> };
