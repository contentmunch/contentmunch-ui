import type {Meta, StoryFn} from '@storybook/react';
import "./assets/text-input-dropdown-story.css";
import {useState} from "react";
import {TextInputDropdown} from "./TextInputDropdown";

const meta: Meta<typeof TextInputDropdown> = {
    component: TextInputDropdown,
    title: 'Input/TextInputDropdown',
    decorators: [
        (Story) => (
            <div className="muncher-input-drop-down-story">
                <Story/>
            </div>)
    ]
};
export default meta;
type Story = StoryFn<typeof meta>;
export const Default: Story = (args) => {
    const [showContent, setShowContent] = useState(false);
    const [value, setValue] = useState("");
    return (
        <div className="muncher-dropdown-story">
            <span>a long text&nbsp;</span>
            <TextInputDropdown {...args}
                               showContent={showContent}
                               setShowContent={setShowContent}
                               handleInputChange={(value) => {
                                   setValue(value);

                               }}
                               value={value}
                               label="country"
                               required={true}
                               error={"This is an error"}
            >
                <p>Drop down content</p>
                <p>Drop down content</p>
                <p>Drop down content</p>
                <p>Drop down content</p>
                <p onClick={() => {
                    setValue("Tese");
                    setShowContent(false);
                }}>Drop down content</p>

            </TextInputDropdown>
        </div>
    );
}
