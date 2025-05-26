import type {Meta, StoryObj} from '@storybook/react';
import "./assets/paper-stories.css";

import {Paper} from "./Paper";

const meta: Meta<typeof Paper> = {
    component: Paper,
    title: 'Surfaces/Paper',
    render: () => <div className="paper-story">
        <Paper showHoverEffect={true}>
            <h3>Lorem ipsum dolor sit amet</h3>
            <p style={{textAlign: "center"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fringilla
                faucibus diam quis faucibus.
                Integer in mattis lectus. Pellentesque sit amet ullamcorper purus, vel facilisis purus. Ut non porta
                nisi. Nulla molestie tellus quis interdum posuere. Nam suscipit odio ligula, ac porttitor nunc
                ullamcorper at. In a ante sit amet sapien faucibus laoreet. Donec accumsan iaculis justo, maximus dictum
                orci mattis a. Fusce auctor massa vitae maximus elementum. Mauris eget diam ullamcorper, bibendum urna
                sed, porttitor ligula. Donec posuere velit lectus, et condimentum neque tristique non. Nam finibus
                imperdiet mauris, vitae ornare odio dapibus ut. Etiam pulvinar ipsum quis urna pulvinar mattis. In sit
                amet urna vitae quam condimentum faucibus ac non diam. Sed facilisis, lorem vitae hendrerit euismod,
                erat turpis aliquam nisl, non vehicula ante ante a augue. Vestibulum ante ipsum primis in faucibus orci
                luctus et ultrices posuere cubilia curae;</p>

            <p style={{textAlign: "center"}}> Duis faucibus nunc enim, ac facilisis ante dictum sed. Aliquam erat
                volutpat. Sed ligula est, tempor
                eget nunc sed, ultricies scelerisque tellus. Aliquam ut posuere felis, ac faucibus ante. Nam tempus,
                neque in rhoncus bibendum, mi dolor blandit lacus, nec lobortis metus lorem sed nulla. Suspendisse
                tristique nulla at faucibus viverra. Vestibulum convallis dui eu sem rhoncus, quis iaculis lectus
                scelerisque. Praesent in vehicula arcu, et bibendum nibh. In laoreet erat eu tempor interdum.
            </p>
        </Paper>
    </div>,
};

export default meta;
type Story = StoryObj<typeof Paper>;
export const Default: Story = {
    args: {}
};
