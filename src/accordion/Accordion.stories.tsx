import type {Meta, StoryFn} from '@storybook/react';
import {Accordion} from "./Accordion";

const meta = {
    title: "Surfaces/Accordion",
    component: Accordion
} satisfies Meta<typeof Accordion>;
export default meta;
type Story = StoryFn<typeof meta>;
export const Default: Story = () =>
    <Accordion variant="secondary">{{
        folds: [
            {
                heading: "Lorem Ipsum",
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
                heading: "Duis faucibus",
                body:
                    <><h3>Duis faucibus</h3><p>Duis faucibus nunc enim, ac facilisis ante dictum sed. Aliquam erat
                        volutpat. Sed ligula est,
                        tempor eget nunc sed, ultricies scelerisque tellus. Aliquam ut posuere felis, ac faucibus ante.
                        Nam
                        tempus, neque in rhoncus bibendum, mi dolor blandit lacus, nec lobortis metus lorem sed nulla.
                        Suspendisse tristique nulla at faucibus viverra. Vestibulum convallis dui eu sem rhoncus, quis
                        iaculis lectus scelerisque. Praesent in vehicula arcu, et bibendum nibh. In laoreet erat eu
                        tempor
                        interdum.</p></>
            },
            {
                heading: "nec lorem",
                body:
                    <><h3>Nec lorem</h3><p>In nec lorem sapien. Nunc suscipit porta leo quis rutrum. Interdum et
                        malesuada fames ac ante
                        ipsum primis in faucibus. Nam ac maximus magna, vel tempus enim. In faucibus fringilla massa, in
                        tincidunt justo imperdiet a. Praesent eu placerat nisi. Donec iaculis ornare felis, eget aliquam
                        ex.
                        Mauris eget magna rutrum, consequat velit quis, eleifend mauris. Maecenas nisi nulla,
                        ullamcorper
                        sit amet maximus sed, pulvinar at arcu. Curabitur molestie lacus accumsan purus venenatis, at
                        viverra eros suscipit. Donec vehicula at ipsum in accumsan. Vivamus blandit tempus turpis, sed
                        dictum enim malesuada in.</p></>
            }
        ]
    }}</Accordion>;


export const ColorfulTemplate: Story = () =>
    <Accordion>{{
        folds: [
            {
                heading: "Crimson",
                body: <><h3>Lorem Ipsum</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fringilla faucibus diam
                        quis faucibus. Integer in mattis lectus. Pellentesque sit amet ullamcorper purus, vel facilisis
                        purus. Ut non porta nisi. Nulla molestie tellus quis interdum posuere. Nam suscipit odio ligula,
                        ac
                        porttitor nunc ullamcorper at. In a ante sit amet sapien faucibus laoreet. Donec accumsan
                        iaculis
                        justo, maximus dictum orci mattis a. Fusce auctor massa vitae maximus elementum. </p></>,
                foldColor: "maroon"
            },
            {
                heading: "Purple",
                body:
                    <><h3>Duis faucibus</h3><p>Duis faucibus nunc enim, ac facilisis ante dictum sed. Aliquam erat
                        volutpat. Sed ligula est,
                        tempor eget nunc sed, ultricies scelerisque tellus. Aliquam ut posuere felis, ac faucibus ante.
                        Nam
                        tempus, neque in rhoncus bibendum, mi dolor blandit lacus, nec lobortis metus lorem sed nulla.
                        Suspendisse tristique nulla at faucibus viverra. Vestibulum convallis dui eu sem rhoncus, quis
                        iaculis lectus scelerisque. Praesent in vehicula arcu, et bibendum nibh. In laoreet erat eu
                        tempor
                        interdum.</p></>,
                foldColor: "purple",
            },
            {
                heading: "Blue",
                body:
                    <><h3>Nec lorem</h3><p>In nec lorem sapien. Nunc suscipit porta leo quis rutrum. Interdum et
                        malesuada fames ac ante
                        ipsum primis in faucibus. Nam ac maximus magna, vel tempus enim. In faucibus fringilla massa, in
                        tincidunt justo imperdiet a. Praesent eu placerat nisi. Donec iaculis ornare felis, eget aliquam
                        ex.
                        Mauris eget magna rutrum, consequat velit quis, eleifend mauris. Maecenas nisi nulla,
                        ullamcorper
                        sit amet maximus sed, pulvinar at arcu. Curabitur molestie lacus accumsan purus venenatis, at
                        viverra eros suscipit. Donec vehicula at ipsum in accumsan. Vivamus blandit tempus turpis, sed
                        dictum enim malesuada in.</p></>,
                foldColor: "blue",
            },
            {
                heading: "Green",
                body:
                    <><h3>Interdum</h3>
                        <p>Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec congue ligula ac ex
                            pretium
                            cursus. Vestibulum vel sapien placerat, egestas lectus eu, hendrerit tortor. Mauris bibendum
                            ac
                            tortor vitae consectetur. In augue velit, sodales at mauris ac, venenatis volutpat sem.
                            Mauris
                            posuere et magna posuere consectetur. Aenean vehicula tempus convallis. Fusce consectetur,
                            diam eget
                            tincidunt volutpat, turpis mi rutrum risus, non imperdiet lectus justo non lorem.</p></>,
                foldColor: "green",
            },
            {
                heading: "Orange",
                body:
                    <><h3>ipsum dolor</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam porta finibus est vestibulum
                            tristique. Mauris condimentum pellentesque turpis, in condimentum leo semper at. Orci varius
                            natoque
                            penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum rhoncus non
                            magna eget
                            elementum. Donec aliquam enim quis feugiat vestibulum. Class aptent taciti sociosqu ad
                            litora
                            torquent per conubia nostra, per inceptos himenaeos. </p></>,
                foldColor: "orange",
            }
        ]
    }}</Accordion>;
