import React, {useCallback, useEffect} from 'react';
import './assets/modal.css';
import {Backdrop} from '..';

let openModalCount = 0;
export const Modal: React.FC<ModalProps> = ({show = false, setShow, children, ...props}) => {
    const escFunction = useCallback((event: KeyboardEvent) => {
        if (event.key === "Escape") {
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
            openModalCount += 1;
            document.body.style.overflow = 'hidden';
        }
        return () => {
            if (show) {
                openModalCount = Math.max(0, openModalCount - 1);
                if (openModalCount === 0) {
                    document.body.style.overflow = 'unset';
                }
            }
        };
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
