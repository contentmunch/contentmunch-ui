import React from "react";
import {Modal} from "../modal/Modal";
import {Icon} from "../icon/Icon";
import type {LightboxState} from "./useMediaImageLightbox";
import "./assets/image-lightbox.css";

export const ImageLightbox: React.FC<ImageLightboxProps> = ({state, show, onClose}) => {
    return (
        <span className="div-image-lightbox">
            <Modal show={show} setShow={onClose}>
                <span className="image-lightbox-content">
                    <button type="button" className="image-lightbox-close" aria-label="Close" onClick={onClose}>
                        <Icon name="close" size="small"/>
                    </button>
                    {state?.type === "image" && <img src={state.src} alt={state.alt}/>}
                    {state?.type === "diagram" && (
                        <span className="image-lightbox-diagram" dangerouslySetInnerHTML={{__html: state.svg}}/>
                    )}
                    {state?.type === "image" && state.caption && (
                        <span className="image-lightbox-caption">{state.caption}</span>
                    )}
                </span>
            </Modal>
        </span>
    );
};

export interface ImageLightboxProps {
    state?: LightboxState | null;
    show: boolean;
    onClose: () => void;
}
