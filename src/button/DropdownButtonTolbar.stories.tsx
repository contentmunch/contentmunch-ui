import type {Meta, StoryFn} from '@storybook/react';
import {useState} from "react";
import "./assets/drop-down-button.css";
import {DropdownButton} from "./DropdownButton";
import {Icon} from "../icon/Icon";
import {Button} from "./Button";

const meta: Meta<typeof DropdownButton> = {
    component: DropdownButton,
    title: 'Buttons/Dropdown Button Toolbar',
};

export default meta;
type Story = StoryFn<typeof meta>;
export const Default: Story = () => {
    const [showContent, setShowContent] = useState(false);
    const [showContent1, setShowContent1] = useState(false);
    const [showContent2, setShowContent2] = useState(false);
    const [showContent3, setShowContent3] = useState(false);
    const [showContent4, setShowContent4] = useState(false);
    const [showContent5, setShowContent5] = useState(false);
    const [showContent6, setShowContent6] = useState(false);
    const [showContent7, setShowContent7] = useState(false);
    const [showContent8, setShowContent8] = useState(false);
    const [showContent9, setShowContent9] = useState(false);
    const [showContent10, setShowContent10] = useState(false);


    return (

        <div className="muncher-toolbar">
            <DropdownButton
                element={
                    <Icon name="code"/>
                }
                showContent={showContent}
                setShowContent={setShowContent}

                size="small">
                <div className="block__content">
                    <Button size="small">
                        This is text1 and two and three&nbsp;<Icon name="align-center"/>
                    </Button>
                </div>
            </DropdownButton>
            <DropdownButton
                element={
                    <Icon name="undo"/>
                }
                showContent={showContent1}
                setShowContent={setShowContent1}

                size="small">
                <div className="block__content">
                    <Button size="small">
                        This is text1 and two and three&nbsp;<Icon name="align-center"/>
                    </Button>
                </div>
            </DropdownButton>
            <DropdownButton
                element={
                    <Icon name="redo"/>
                }
                showContent={showContent2}
                setShowContent={setShowContent2}

                size="small">
                <div className="block__content">
                    <Button size="small">
                        This is text1 and two and three&nbsp;<Icon name="align-center"/>
                    </Button>
                </div>
            </DropdownButton>

            <DropdownButton
                element={
                    <Icon name="ordered-list"/>
                }
                showContent={showContent3}
                setShowContent={setShowContent3}

                size="small">
                <div className="block__content">
                    <Button size="small">
                        This is text1 and two and three&nbsp;<Icon name="align-center"/>
                    </Button>
                </div>
            </DropdownButton>

            <DropdownButton
                element={
                    <Icon name="unordered-list"/>
                }
                showContent={showContent4}
                setShowContent={setShowContent4}

                size="small">
                <div className="block__content">
                    <Button size="small">
                        This is text1 and two and three&nbsp;<Icon name="align-center"/>
                    </Button>
                </div>
            </DropdownButton>
            <DropdownButton
                element={
                    <Icon name="align-center"/>
                }
                showContent={showContent5}
                setShowContent={setShowContent5}

                size="small">
                <div className="block__content">
                    <Button size="small">
                        This is text1 and two and three&nbsp;<Icon name="align-center"/>
                    </Button>
                </div>
            </DropdownButton>

            <DropdownButton
                element={
                    <Icon name="align-center"/>
                }
                showContent={showContent6}
                setShowContent={setShowContent6}

                size="small">
                <div className="block__content">
                    <Button size="small">
                        This is text1 and two and three&nbsp;<Icon name="align-center"/>
                    </Button>
                </div>
            </DropdownButton>

            <DropdownButton
                element={
                    <Icon name="alert"/>
                }
                showContent={showContent7}
                setShowContent={setShowContent7}

                size="small">
                <div className="block__content">
                    <Button size="small">
                        This is text1 and two and three&nbsp;<Icon name="align-center"/>
                    </Button>
                </div>
            </DropdownButton>
            <DropdownButton
                element={
                    <Icon name="grid"/>
                }
                showContent={showContent8}
                setShowContent={setShowContent8}

                size="small">
                <div className="block__content">
                    <Button size="small">
                        This is text1 and two and three&nbsp;<Icon name="align-center"/>
                    </Button>
                </div>
            </DropdownButton>
            <DropdownButton
                element={
                    <Icon name="print"/>
                }
                showContent={showContent9}
                setShowContent={setShowContent9}

                size="small">
                <div className="block__content">
                    <Button size="small">
                        This is text1 and two and three&nbsp;<Icon name="align-center"/>
                    </Button>
                </div>
            </DropdownButton>
            <DropdownButton
                element={
                    <Icon name="settings"/>
                }
                showContent={showContent10}
                setShowContent={setShowContent10}

                size="small">
                <div className="block__content">
                    <Button size="small">
                        This is text1 and two and three&nbsp;<Icon name="align-center"/>
                    </Button>
                </div>
            </DropdownButton>
        </div>

    )
};
