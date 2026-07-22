import React from "react";
import {Modal} from "../modal/Modal";
import {Icon} from "../icon/Icon";
import "./assets/image-lightbox.css";

export const ImageLightbox: React.FC<ImageLightboxProps> = ({src, alt = "", caption, show, onClose}) => {
    return (
        <span className="div-image-lightbox">
            <Modal show={show} setShow={onClose}>
                <span className="image-lightbox-content">
                    <button type="button" className="image-lightbox-close" aria-label="Close" onClick={onClose}>
                        <Icon name="close" size="small"/>
                    </button>
                    {src && <img src={src} alt={alt}/>}
                    {caption && <span className="image-lightbox-caption">{caption}</span>}
                </span>
            </Modal>
        </span>
    );
};

export interface ImageLightboxProps {
    src?: string;
    alt?: string;
    caption?: string;
    show: boolean;
    onClose: () => void;
}
