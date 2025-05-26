import React, {useCallback, useEffect} from 'react';
import './assets/modal.css';
import {Backdrop} from '..';

export const Modal: React.FC<ModalProps> = ({show = false, setShow, children, ...props}) => {
    const escFunction = useCallback((event: any) => {
        if (event.keyCode === 27) {
            setShow(false);
        }
    }, [setShow]);
    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction]);
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [show]);
    return (
        <React.Fragment>
            <Backdrop show={show} backdropClickHandler={() => setShow(false)}/>
            <div className="muncher-modal"
                 style={{
                     transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                     opacity: show ? '1' : '0'
                 }}
                 {...props}
            >

                {children}
            </div>
        </React.Fragment>
    )
};

export interface ModalProps {
    show: boolean;
    setShow: (b: boolean) => void;
    children?: any;
}
