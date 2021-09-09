import React from "react";
import { Formik, Field, Form, FormikHelpers } from 'formik';

import './style.scss';
import {Button} from 'react-bootstrap';
import UserDeleteModal from 'components/DeleteUserModal';

import HandleDataModal from 'shared/ui/Modal/HandleDataModal'
// import ConfirmationModal from 'shared/ui/Modal/ConfirmationModal';

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
    CORRECT_USER_DATA
} from 'ducks/userTable';

interface IUsersTableProps {
    columns: string[],
    initialTableData: IUserData[],
    defaultFormValues: IUserData,
}

function UsersTable(props: IUsersTableProps) {
    const {
        columns,
        initialTableData,
        defaultFormValues,
    } = props;

    const [tableState, dispatch] = React.useReducer<React.Reducer<IReducerRecord, usersTableAction>>(reducer, reducerRecord);
    const [tableDataModalShow, setTableDataModalShow] = React.useState<boolean>(false);
    const [deleteDataModalShow, setDeleteDataModalShow] = React.useState<boolean>(false);
    const [modifyTableState, setModifyTableState] = React.useState<null | string>(null);
    const [initialFormValues, setInitialFormValues] = React.useState<IUserData>(defaultFormValues);
    const [userIndex, setUserIndex] = React.useState<null | number>(null);

    function correctData(obj: IUserData, index: number): void {
        setModifyTableState(CORRECT_USER_DATA);
        setInitialFormValues(obj)
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
        title: string,
        confirmButton: string,
    }

    function getDataModalLabels(): ILabels {
        const labels: ILabels = {
            title: '',
            confirmButton: ''
        };
        if (modifyTableState === SET_NEW_USER_DATA) {
            labels.title = 'Создание пользователя';
            labels.confirmButton = 'Создать';
        } else if (modifyTableState === CORRECT_USER_DATA) {
            labels.title = 'Редактирование пользователя';
            labels.confirmButton = 'Сохранить';
        } else {
            labels.title = '';
            labels.confirmButton = '';
        }
        return labels;
    }

    React.useEffect(() => {
        if (!tableState.tableData) {
            getUsersList(dispatch, tableState, initialTableData)
        }
    }, [tableState, initialTableData]);

    return (
        <>
            <Button variant="primary" onClick={() => {
                setTableDataModalShow(true)
                setModifyTableState(SET_NEW_USER_DATA);

            }}>
              + Добавить пользователя
            </Button>

            <table>
                <thead>
                    <tr>
                        {columns.map((item) => {
                            return <th key={item}>{item}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {tableState.tableData && tableState.tableData.map((user, i) => {
                        return (
                            <tr key={user.login + i}>
                                {Object.keys(user).map((userData, i) => {
                                    return <td key={userData + i}>{user[userData]}</td>
                                })}
                                <td>
                                    <button onClick={() => correctData(user, i)}>
                                        CORRECT DATA
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => prepareToDeleteUserData(i)}>
                                        DELETE
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
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

              children={<>
                    <Formik
                        initialValues={initialFormValues}
                        onSubmit={(values: IUserData, {setSubmitting, resetForm}: FormikHelpers<IUserData>) => {
                            if (modifyTableState === SET_NEW_USER_DATA) {
                                setUserData(dispatch, tableState, values);
                            } else {
                                correctUserData(dispatch, tableState, values, userIndex);
                                setInitialFormValues(defaultFormValues);
                            }
                            setTableDataModalShow(false);
                            setSubmitting(false)
                            resetForm();
                            setModifyTableState(null);
                        }}
                    >
                        <Form>
                            <label htmlFor="lastName">Фамилия</label>
                            <Field id="lastName" name="lastName" placeholder="pass lastName" required/>
                            <label htmlFor="firstName">Имя</label>
                            <Field id="firstName" name="firstName" placeholder="pass firstName" required/>
                            <label htmlFor="midleName">Отчество</label>
                            <Field id="midleName" name="midleName" placeholder="pass midleName" required/>
                            <label htmlFor="email">E-mail</label>
                            <Field id="email" name="email" placeholder="pass email" required/>
                            <label htmlFor="login">Логин</label>
                            <Field id="login" name="login" placeholder="pass login" required/>
                            <Button type="submit">{getDataModalLabels().confirmButton}</Button>
                        </Form>
                    </Formik>
                </>}
            />
        </>
    )
}

export default UsersTable;