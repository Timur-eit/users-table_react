import ModalWindow from "shared/ui/Modal";
import getSubmitModalData from "./submitModalData";

import {
  IUserData,
} from 'ducks/userTable';

export interface ITableDataModalProps {
  // userName?: string | null;
  // openState: boolean;
  // setOpenState: (state: boolean) => void;
  // additionalStateHandler: (state: boolean) => void,
  [prop: string]: any
}

function TableDataModal(props: ITableDataModalProps) {

  const {
    openState,
    setOpenState,
    children
  } = props;

  // console.log(state);


  const submitMessage = getSubmitModalData();

  return (    
    
    <ModalWindow
      modalData={submitMessage}
      declineButton={false}
      openState={openState}
      setOpenState={setOpenState}
      children={children}
      // additionalStateHandler={additionalStateHandler}

    />
  );
}

export default TableDataModal;
