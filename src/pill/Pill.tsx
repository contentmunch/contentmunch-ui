import React from 'react';
import './assets/pill.css';
import {Icon} from '..';

export const Pill: React.FC<PillProps> = ({pillCloseHandler, children, ...props}) => {
    return (
        <div className="muncher-pill" {...props}>
            <div className="close" onClick={pillCloseHandler}><Icon name="close"/></div>
            <div className="content"> {children}</div>
        </div>
    )
};

export interface PillProps {
    pillCloseHandler?: () => void;
    children?: any;
}
