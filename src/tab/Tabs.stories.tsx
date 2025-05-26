import type {Meta, StoryObj} from '@storybook/react';
import {Tabs} from "./Tabs";

const meta: Meta<typeof Tabs> = {
    component: Tabs,
    title: 'Surfaces/Tab',
    render: () => <Tabs>{{
        tabs: [
            {
                header: "Lorem Ipsum",
                body: <><h3>Lorem Ipsum</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fringilla faucibus diam
                        quis faucibus. Integer in mattis lectus. Pellentesque sit amet ullamcorper purus, vel facilisis
                        purus. Ut non porta nisi. Nulla molestie tellus quis interdum posuere. Nam suscipit odio ligula,
                        ac
                        porttitor nunc ullamcorper at. In a ante sit amet sapien faucibus laoreet. Donec accumsan
                        iaculis
                        justo, maximus dictum orci mattis a. Fusce auctor massa vitae maximus elementum. </p></>
            },
            {
                header: "Duis faucibus",
                body: <><h3>Duis faucibus</h3><p>Duis faucibus nunc enim, ac facilisis ante dictum sed. Aliquam erat
                    volutpat. Sed ligula est,
                    tempor eget nunc sed, ultricies scelerisque tellus. Aliquam ut posuere felis, ac faucibus ante. Nam
                    tempus, neque in rhoncus bibendum, mi dolor blandit lacus, nec lobortis metus lorem sed nulla.
                    Suspendisse tristique nulla at faucibus viverra. Vestibulum convallis dui eu sem rhoncus, quis
                    iaculis lectus scelerisque. Praesent in vehicula arcu, et bibendum nibh. In laoreet erat eu tempor
                    interdum.</p></>
            },
            {
                header: "nec lorem",
                body: <><h3>Nec lorem</h3><p>In nec lorem sapien. Nunc suscipit porta leo quis rutrum. Interdum et
                    malesuada fames ac ante
                    ipsum primis in faucibus. Nam ac maximus magna, vel tempus enim. In faucibus fringilla massa, in
                    tincidunt justo imperdiet a. Praesent eu placerat nisi. Donec iaculis ornare felis, eget aliquam ex.
                    Mauris eget magna rutrum, consequat velit quis, eleifend mauris. Maecenas nisi nulla, ullamcorper
                    sit amet maximus sed, pulvinar at arcu. Curabitur molestie lacus accumsan purus venenatis, at
                    viverra eros suscipit. Donec vehicula at ipsum in accumsan. Vivamus blandit tempus turpis, sed
                    dictum enim malesuada in.</p></>
            }
        ]
    }}</Tabs>,
};

export default meta;
type Story = StoryObj<typeof Tabs>;
export const Default: Story = {
    args: {}
};
