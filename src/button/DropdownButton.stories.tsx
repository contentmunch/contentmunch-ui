import type {Meta, StoryFn} from '@storybook/react';
import {useState} from "react";
import "./assets/drop-down-button-story.css";
import {DropdownButton} from "./DropdownButton";

const meta: Meta<typeof DropdownButton> = {
    component: DropdownButton,
    title: 'Buttons/Dropdown Button',
};

export default meta;
type Story = StoryFn<typeof meta>;
export const Default: Story = (args) => {
    const [showContent, setShowContent] = useState(false);
    return (
        <div className="muncher-dropdown-story">
            <span>a long text&nbsp;</span>
            <DropdownButton element={<p>drop down</p>}  {...args} showContent={showContent}
                            setShowContent={setShowContent}>
                <p>Drop down content little longer</p>
            </DropdownButton>
        </div>
    );
}
