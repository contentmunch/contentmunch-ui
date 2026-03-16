import type {Meta, StoryObj} from '@storybook/react';
import {StepContainer} from "./StepContainer";
import {Step} from "./Step.tsx";
import {StepLine} from "./StepLine.tsx";

const meta: Meta<typeof StepContainer> = {
    component: StepContainer,
    title: 'Data Display/Step',
    render: (args) => <StepContainer {...args}/>,
};

export default meta;
type Story = StoryObj<typeof StepContainer>;
export const StepContainerStep1: Story = {
    args: {
        children:
            <>
                <Step active={true} label="You are here">1</Step>
                <StepLine/>
                <Step>2</Step>
                <StepLine/>
                <Step>3</Step>
            </>
    }
}

export const StepContainerStep2: Story = {
    args: {
        children:
            <>
                <Step completed={true}>1</Step>
                <StepLine/>
                <Step active={true} label="You are here">2</Step>
                <StepLine/>
                <Step>3</Step>
            </>
    }
}

