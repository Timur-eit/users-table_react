import React from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";

export interface IConfirmationWindowProps {
	modalTitle: string,
	contentText: string,
	declineButtonLabel: string,
	confirmButtonText: string,
  	openState: boolean,
  	setOpenState: (state: boolean) => void,
  	confirmAction: () => void,
  	// children: React.ReactElement
}

function ConfirmationModal(props: IConfirmationWindowProps) {
	
	const {
		modalTitle,
		contentText,
		declineButtonLabel,
		confirmButtonText,
  		openState,
  		setOpenState,
  		confirmAction,  		
	} = props;
	

	const handleClose = () => {
		setOpenState(false);
	};	

	const confirmButtonHandler = () => {
		confirmAction();
		handleClose();
	}

	return (
		<Modal show={openState} onHide={handleClose} centered>
		  <Modal.Header>
			<Modal.Title>{modalTitle}</Modal.Title>
		  </Modal.Header>
		  <Modal.Body>{contentText}</Modal.Body>
		  <Modal.Footer>
			<Button variant="secondary" onClick={handleClose}>
			  {declineButtonLabel}
			</Button>
			<Button variant="primary" onClick={confirmButtonHandler}>
			  {confirmButtonText}
			</Button>
		  </Modal.Footer>
		</Modal>
	);
  }

  export default ConfirmationModal;