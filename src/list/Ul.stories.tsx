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
            <Li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Li>
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
