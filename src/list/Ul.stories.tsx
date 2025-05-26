import type {Meta, StoryObj} from '@storybook/react';
import {Ul} from "./Ul";
import {Li} from "./Li";

const meta: Meta<typeof Ul> = {
    component: Ul,
    title: 'List/Unordered List',
    render: () => <>
        <h3>This is Un-ordered List</h3>
        <Ul>
            <Li isFeatured={true}>Bonus room</Li>
            <Li bulletColor="green" bulletIcon="check">Gourmet kitchen</Li>
            <Li>Wood floors</Li>
            <Li bulletIcon="chevron-right">All-electric</Li>
            <Li>On-site recycling</Li>
        </Ul>
    </>,
};

export default meta;
type Story = StoryObj<typeof Ul>;
export const Default: Story = {
    args: {}
};
