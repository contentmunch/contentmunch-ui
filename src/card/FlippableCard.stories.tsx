import type {Meta, StoryObj} from '@storybook/react';
import "./assets/card-stories.css";
import {FlippableCard} from "./FlippableCard.tsx";
import {useState} from "react";


const meta: Meta<typeof FlippableCard> = {
    component: FlippableCard,
    title: 'Surfaces/Flippable Card',
    render: () => {
        const [flipped, setFlipped] = useState(false);
        return <div className="card-story">
            <FlippableCard flipped={flipped} setFlipped={setFlipped} front={
                <div className="card-story--div">
                    <h3>Lorem ipsum dolor sit amet</h3>

                </div>
            }
                           back={
                               <div className="card-story--div">
                                   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fringilla
                                       faucibus diam quis faucibus.
                                       Integer in mattis lectus. Pellentesque sit amet ullamcorper purus, vel facilisis
                                       purus. Ut non
                                       porta
                                       nisi. Nulla molestie tellus quis interdum posuere. Nam suscipit odio ligula, ac
                                       porttitor nunc
                                       ullamcorper at. In a ante sit amet sapien faucibus laoreet. </p>
                               </div>
                           }
            >


            </FlippableCard>
        </div>
    },
};

export default meta;
type Story = StoryObj<typeof FlippableCard>;
export const Default: Story = {
    args: {}
};
