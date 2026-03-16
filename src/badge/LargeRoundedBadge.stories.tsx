import type {Meta, StoryObj} from '@storybook/react';
import {Badge} from "./Badge";
import {LargeRoundedBadge} from "./LargeRoundedBadge.tsx";

const meta: Meta<typeof LargeRoundedBadge> = {
    component: Badge,
    title: 'Data Display/Badge',
    render: (args) => <LargeRoundedBadge {...args}/>
};

export default meta;
type Story = StoryObj<typeof LargeRoundedBadge>;
export const LargeRounded: Story = {
    args: {
        children: <div className="badge-content"><p>Step</p><p className="emphasized">1</p></div>
    }
}

export const LargeRoundedCompleted: Story = {
    args: {
        completed: true,
    }
}

export const LargeRoundedSecondary: Story = {
    args: {
        variant: "secondary",
        children: <div className="badge-content"><p>Step</p><p className="emphasized">2</p></div>
    }
}

export const LargeRoundedPrimary: Story = {
    args: {
        variant: "primary",
        children: <div className="badge-content"><p>Step</p><p className="emphasized">3</p></div>
    }
}
