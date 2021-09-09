import ModalWindow from "shared/ui/Modal";
export interface ITableDataModalProps {
  openState: boolean,
  setOpenState: (state: boolean) => void,
  modalTitle: string,
  confirmButtonLabel: string,
  children: React.ReactElement,
}

function TableDataModal(props: ITableDataModalProps) {
  const {
    openState,
    setOpenState,
    modalTitle,
    confirmButtonLabel,
    children
  } = props;

  return (

    <ModalWindow
      modalTitle={modalTitle}
      confirmButtonLabel={confirmButtonLabel}
      declineButton={true}
      openState={openState}
      setOpenState={setOpenState}
      children={children}
    />
  );
}

export default TableDataModal;
