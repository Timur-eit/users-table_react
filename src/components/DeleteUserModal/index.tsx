import ConfirmationModal from "shared/ui/Modal/ConfirmationModal";
export interface IUserDeleteModalProps {
    openState: boolean,
    setOpenState: (state: boolean) => void,
    confirmAction: () => void,
}

function UserDeleteModal(props: IUserDeleteModalProps) {
    const {
        openState,
        setOpenState,
        confirmAction,
    } = props;

    return (
        <ConfirmationModal
            modalTitle={'Удаление пользователя'}
            contentText={'Удалить выбранного пользователя?'}
            declineButtonLabel={'Отменить'}
            confirmButtonText={'Удалить'}
            openState={openState}
            setOpenState={setOpenState}
            confirmAction={confirmAction}
        />
  );
}

export default UserDeleteModal;
