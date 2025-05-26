import type {Meta} from '@storybook/react';
import type {StoryFn} from "@storybook/react";
import "./assets/modal-story.css";
import {useState} from "react";
import {Modal} from "./Modal";
import {Button} from "../button/Button";

const meta: Meta<typeof Modal> = {
    component: Modal,
    title: 'Feedback/Modal',
    decorators: [
        (Story) => (
            <div style={{padding: '2rem', background: '#f5f5f5'}}>
                <Story/>
            </div>)
    ]
};
export default meta;
type Story = StoryFn<typeof meta>;
export const Default: Story = () => {
    const [show, setShow] = useState(false);
    return (
        <div className="muncher-modal-story">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet turpis et quam viverra rhoncus
                vel eu tellus. Maecenas vel urna mi. Mauris sollicitudin hendrerit purus, vitae ullamcorper nisl
                pharetra maximus. Vestibulum nec aliquet neque. Nullam in nunc ac augue fermentum semper. Mauris ante
                felis, dictum scelerisque tempus vitae, sollicitudin vitae sapien. Aenean vehicula risus sed sem
                bibendum viverra.</p>
            <p>Proin auctor, felis eget malesuada pellentesque, metus magna pharetra augue, consequat fermentum diam
                velit eget eros. Proin sagittis rutrum arcu, nec interdum urna condimentum vitae. In sit amet nibh quis
                mauris malesuada gravida eu viverra nibh. Nullam non nunc et tellus sagittis rhoncus. Donec efficitur
                nunc nulla, eget faucibus leo blandit a. Aenean mauris nulla, tristique quis diam ut, euismod convallis
                arcu. In maximus purus vitae pulvinar commodo. Donec id sapien tristique, varius dolor ut, feugiat
                metus. Nullam semper vehicula sem et ornare. Praesent eget purus ut dui efficitur laoreet. Cras et ipsum
                sed ipsum rutrum laoreet mollis facilisis justo.</p>
            <p>Vivamus eget vehicula ex. Phasellus bibendum mi nec purus tincidunt luctus. Donec ornare facilisis
                rutrum. Fusce mollis luctus felis sit amet euismod. Donec ut elit lorem. Morbi eu quam massa. Praesent
                auctor massa orci, et lacinia magna vestibulum tempus. Vivamus dapibus dignissim tortor, in condimentum
                enim. Fusce ligula neque, fermentum sit amet nisi non, gravida gravida tortor.</p>
            <p>Integer rutrum scelerisque rutrum. Nam pretium sem enim, non rhoncus massa viverra id. Morbi pellentesque
                in arcu et semper. Nunc euismod finibus leo nec efficitur. Mauris justo tortor, suscipit a tempor eget,
                ultricies at orci. Praesent lobortis gravida quam, sed vehicula dui. Ut porttitor sapien vitae lobortis
                pharetra. Cras congue nunc nisi, quis gravida orci sollicitudin vitae. Integer dictum venenatis porta.
                In dictum et elit eget ornare. Interdum et malesuada fames ac ante ipsum primis in faucibus. In hac
                habitasse platea dictumst. Aliquam ac cursus felis.</p>
            <Button variant="tertiary" onClick={() => {
                setShow(true)
            }}>Show Modal</Button>
            <Modal show={show} setShow={setShow}><h2>Modal title</h2>
                <section>Modal Body</section>
            </Modal>
        </div>
    );
}
