import type {Meta, StoryObj} from '@storybook/react';
import "./assets/card-stories.css";
import {Card} from "./Card.tsx";


const meta: Meta<typeof Card> = {
    component: Card,
    title: 'Surfaces/Card',
    render: () =>
        <div className="card-story">
            <Card>
                <div className="card-story--div">
                    <h3>Lorem ipsum dolor sit amet</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fringilla
                        faucibus diam quis faucibus.
                        Integer in mattis lectus. Pellentesque sit amet ullamcorper purus, vel facilisis purus. Ut non
                        porta
                        nisi. Nulla molestie tellus quis interdum posuere. Nam suscipit odio ligula, ac porttitor nunc
                        ullamcorper at. In a ante sit amet sapien faucibus laoreet. </p>
                </div>

            </Card>
        </div>,
};

export default meta;
type Story = StoryObj<typeof Card>;
export const Default: Story = {
    args: {}
};
