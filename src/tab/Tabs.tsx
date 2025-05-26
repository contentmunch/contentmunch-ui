import React, {type ReactNode, useState} from "react";

import "./assets/tabs.css";
import {Button} from "../button/Button";

export const Tabs: React.FC<TabsProps> = ({handleTabSelected, children}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const {tabs} = children;
    const handleIndexChange = (index: number) => {
        setCurrentIndex(index);
        if (handleTabSelected)
            handleTabSelected(index);
    };
    return (
        <section className="muncher-tabs">
            <header>
                {tabs.map((tab, index) =>
                    <div key={"muncher-tab-header" + index} className="muncher-tab-header--item">
                        <Button variant="transparent"
                                active={currentIndex === index}
                                size="small"
                                title={tab.headerTitle}
                                onClick={() => {
                                    handleIndexChange(index);
                                }}>
                            {tab.header}
                        </Button>
                        {index !== tabs.length - 1 ? <span className="spacer">|</span> : ""}
                    </div>
                )}
            </header>
            {tabs.map((tab, index) =>
                <section key={"muncher-tab-" + index}
                         className={currentIndex === index ? "muncher-tab muncher-tab--active" : "muncher-tab"}>
                    {tab.body}
                </section>
            )}
        </section>
    );
}

export interface TabsProps {
    children: {
        tabs: {
            header: string,
            headerTitle?: string,
            body: ReactNode
        }[]
    },
    handleTabSelected?: (index: number) => void
}
