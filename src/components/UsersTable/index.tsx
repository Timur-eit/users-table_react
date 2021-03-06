import React from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import classNames from 'classnames';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';

import UserDeleteModal from 'components/DeleteUserModal';
import HandleDataModal from 'shared/ui/Modal/HandleDataModal';
import { IColumnsNames } from 'data/initialTableData';
import { getByPlaceholderText } from 'shared/utils';
import validate from 'components/UsersTable/validation/validation';
import TextInput from 'components/TextInput';
import UserTableRow from 'components/UserTableRow';
import TableHeader from 'components/TableHeader';

import {
    IUserData,
    usersTableAction,
    reducer,
    reducerRecord,
    IReducerRecord,
    getUsersList,
    deleteUserData,
    setUserData,
    correctUserData,
    SET_NEW_USER_DATA,
    CORRECT_USER_DATA,
} from 'ducks/userTable';

interface IUsersTableProps {
    columnData: IColumnsNames;
    initialTableData: IUserData[];
    defaultFormValues: IUserData;
}

function UsersTable(props: IUsersTableProps) {
    const { columnData, initialTableData, defaultFormValues } = props;

    const [tableState, dispatch] = React.useReducer<React.Reducer<IReducerRecord, usersTableAction>>(
        reducer,
        reducerRecord
    );
    const [tableDataModalShow, setTableDataModalShow] = React.useState<boolean>(false);
    const [deleteDataModalShow, setDeleteDataModalShow] = React.useState<boolean>(false);
    const [modifyTableState, setModifyTableState] = React.useState<null | string>(null);
    const [initialFormValues, setInitialFormValues] = React.useState<IUserData>(defaultFormValues);
    const [userIndex, setUserIndex] = React.useState<null | number>(null);
    const [submitAvailable, setSubmitAvailable] = React.useState<boolean>(false);

    function correctData(obj: IUserData, index: number): void {
        setModifyTableState(CORRECT_USER_DATA);
        setInitialFormValues(obj);
        setTableDataModalShow(true);
        setUserIndex(index);
    }

    function prepareToDeleteUserData(userIndex: number): void {
        setUserIndex(userIndex);
        setDeleteDataModalShow(true);
    }

    function deleteUser(): void {
        deleteUserData(dispatch, tableState, userIndex);
        setUserIndex(null);
    }

    interface ILabels {
        title: string;
        confirmButton: string;
    }

    function getDataModalLabels(): ILabels {
        const labels: ILabels = {
            title: '',
            confirmButton: '',
        };
        if (modifyTableState === SET_NEW_USER_DATA) {
            labels.title = '???????????????? ????????????????????????';
            labels.confirmButton = '??????????????';
        } else if (modifyTableState === CORRECT_USER_DATA) {
            labels.title = '???????????????????????????? ????????????????????????';
            labels.confirmButton = '??????????????????';
        } else {
            labels.title = '';
            labels.confirmButton = '';
        }
        return labels;
    }

    React.useEffect(() => {
        if (!tableState.tableData) {
            getUsersList(dispatch, tableState, initialTableData);
        }
    }, [tableState, initialTableData]);

    const submitButtonClasses = classNames({
        'submit-btn': true,
        'submit-btn--disabled': !submitAvailable,
    });

    return (
        <div className="table">
            <TableHeader
                title={'????????????????????????'}
                buttonClickAction={() => {
                    setTableDataModalShow(true);
                    setModifyTableState(SET_NEW_USER_DATA);
                }}
            />

            <table>
                <thead>
                    <tr className="table-row">
                        {Object.values(columnData).map((item) => {
                            return <th key={item}>{item}</th>;
                        })}
                        <th></th>
                    </tr>
                </thead>
                {tableState.tableData &&
                    tableState.tableData.map((user, i) => {
                        return (
                            <tbody key={user.login + i}>
                                <UserTableRow
                                    user={user}
                                    userIndex={i}
                                    correctDataAction={correctData}
                                    prepareToDeleteUserDataAction={prepareToDeleteUserData}
                                />
                            </tbody>
                        );
                    })}
            </table>

            <UserDeleteModal
                openState={deleteDataModalShow}
                setOpenState={setDeleteDataModalShow}
                confirmAction={() => deleteUser()}
            />

            <HandleDataModal
                openState={tableDataModalShow}
                setOpenState={setTableDataModalShow}
                modalTitle={getDataModalLabels().title}
                extraAction={() => setInitialFormValues(defaultFormValues)}
                children={
                    <>
                        <Formik
                            initialValues={initialFormValues}
                            onSubmit={(
                                values: IUserData,
                                { setSubmitting, resetForm }: FormikHelpers<IUserData>
                            ) => {
                                if (modifyTableState === SET_NEW_USER_DATA) {
                                    setUserData(dispatch, tableState, values);
                                } else {
                                    correctUserData(dispatch, tableState, values, userIndex);
                                    setInitialFormValues(defaultFormValues);
                                }
                                setTableDataModalShow(false);
                                setSubmitting(false);
                                resetForm();
                                setModifyTableState(null);
                            }}
                            validate={(values) => validate(values, setSubmitAvailable)}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    {Object.keys(columnData).map((fieldName, i) => {
                                        return (
                                            <div key={fieldName + i}>
                                                <TextInput
                                                    inputName={fieldName}
                                                    labelName={columnData[fieldName]}
                                                    inputPlaceholder={getByPlaceholderText(fieldName)}
                                                    required={true}
                                                    FormikConnectorTag={Field}
                                                    touched={touched}
                                                    errors={errors}
                                                />
                                            </div>
                                        );
                                    })}
                                    <Modal.Footer>
                                        <Button className={submitButtonClasses} type="submit">
                                            {getDataModalLabels().confirmButton}
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            )}
                        </Formik>
                    </>
                }
            />
        </div>
    );
}

export default UsersTable;
