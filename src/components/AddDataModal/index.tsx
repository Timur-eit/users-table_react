import ModalWindow from "shared/ui/Modal";
import getSubmitModalData from "./submitModalData";

export interface IAddDataModalProps {
  userName?: string | null;
  openState: boolean;
  setOpenState: (state: boolean) => void;
  // additionalStateHandler: (state: boolean) => void,
}

function AddDataModal(props: IAddDataModalProps) {
  const { openState, setOpenState } = props;
  const submitMessage = getSubmitModalData();

  return (
    <ModalWindow
      modalData={submitMessage}
      declineButton={false}
      openState={openState}
      setOpenState={setOpenState}
      // additionalStateHandler={additionalStateHandler}
      
    />
  );
}

export default AddDataModal;
