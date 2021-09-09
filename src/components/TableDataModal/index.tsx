import HandleDataModal from "shared/ui/Modal/HandleDataModal";
export interface IUserDataModalProps {
  openState: boolean,
  setOpenState: (state: boolean) => void,
  modalTitle: string,
  // confirmButtonLabel: string,
  children: React.ReactElement,
  extraAction: () => void,
}

function UserDataModal(props: IUserDataModalProps) {
  const {
    openState,
    setOpenState,
    modalTitle,
    children,
    extraAction
  } = props;

  return (

    <HandleDataModal
      modalTitle={modalTitle}
      openState={openState}
      setOpenState={setOpenState}
      children={children}
      extraAction={extraAction}
    />
  );
}

export default UserDataModal;
