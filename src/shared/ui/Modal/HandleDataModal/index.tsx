import React from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';

export interface IModalWindowProps {
    modalTitle: string;
    openState: boolean;
    setOpenState: (state: boolean) => void;
    extraAction: () => void;
    children: React.ReactElement;
}

function HandleDataModal(props: IModalWindowProps) {
    const { modalTitle, openState, setOpenState, extraAction, children } = props;

    const handleClose = () => {
        setOpenState(false);
        extraAction();
    };

    return (
        <Modal
            show={openState}
            centered
            onHide={handleClose}
            backdrop="static"
            dialogClassName="handle-data-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-children">
                    <div>{children}</div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default HandleDataModal;
