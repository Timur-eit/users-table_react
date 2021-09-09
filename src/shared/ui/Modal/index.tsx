import React from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";
// import { IModalData } from "shared/interfaces";

export interface IModalWindowProps {
  // modalData: IModalData | null;
  // declineButton: boolean;
  // openState: boolean;
  // setOpenState: (state: boolean) => void;
  // additionalStateHandler?: (state: boolean) => void;
  // acceptAction?: () => void;
  // declineAction?: () => void;
  // onHide?: boolean;
  [property: string]: any;
}

function ModalWindow(props: IModalWindowProps) {
  const {
    modalTitle,
    declineButton,
    openState,
    setOpenState,
    confirmButtonLabel,
    // additionalStateHandler,
    // acceptAction,
    // declineAction,
    children
  } = props;

  // const [show, setShow] = React.useState(false);

  const handleClose = () => {
    // setShow(false)
    setOpenState(false);
  };

  // const handleShow = () => setShow(true);

  // const handleClose = (): void => {
  //   setOpenState(false);

  //   if (additionalStateHandler) {
  //     additionalStateHandler(true);
  //   }
  //   if (acceptAction) {
  //     acceptAction();
  //   }
  // };

  // const declineHanlder = (): void => {
  //   if (declineAction) {
  //     declineAction();
  //     setOpenState(false);
  //   }
  // };

  // React.useEffect(() => {
  //   if (openState) {
  //     setOpenState(true);
  //   }
  // }, [openState, setOpenState]);

  return (
    <>
      <Modal
        show={openState}
        centered
        onHide={handleClose}
      >

      <Modal.Header closeButton>
      {/* <div className="modal-title-block"> */}
          <Modal.Title>{modalTitle}</Modal.Title>
            {declineButton && (
              <div
                // onClick={() => declineHanlder()}
                className={"decline-btn"}
              ></div>
            )}
          {/* </div>         */}

      </Modal.Header>

        <Modal.Body>

          {/* {modalData && modalData.content} */}
          {children}
          <Button variant="primary" onClick={handleClose}>
            {confirmButtonLabel}
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalWindow;
