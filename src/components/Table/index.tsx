import React from "react";
import {Button, Modal} from 'react-bootstrap';
import TableDataModal from 'components/TableDataModal';

import { Formik, Field, Form, FormikHelpers } from 'formik';

import './style.scss';
import {
    IUserData,
    reducer,
    reducerRecord,
    getUsersList,
    deleteUserData,
    setUserData,
    SET_NEW_USER_DATA,
    CORRECT_USER_DATA
} from 'ducks/userTable';

interface ITableProps {
    [poperty: string]: any
}

const columnNames: string[] = ['Фамилия', 'Имя', 'Отчество', 'E-mail', 'Логин'];

// export interface IData {
//     [property: string]: string,
// }

const data: IUserData[] = [
    {
        lastName: 'Иванов',
        firstName: 'Иван',
        midleName: 'Иванович',
        email: 'ivan@mail.ru',
        login: 'user1',
    },
    {
        lastName: 'Сергеев',
        firstName: 'Сергей',
        midleName: 'Сергеевич',
        email: 'sergey@mail.ru',
        login: 'user2',
    },
    {
        lastName: 'Петров',
        firstName: 'Перт',
        midleName: 'Петрович',
        email: 'petr@mail.ru',
        login: 'user3',
    }
];

function Table(props: ITableProps) {

    const defaultFormValues: IUserData = {
        lastName: '',
        firstName: '',
        midleName: '',
        email: '',
        login: '',
    };   

    const [tableState, dispatch] = React.useReducer(reducer, reducerRecord);
    const [modalShow, setModalShow] = React.useState<boolean>(false);
    const [modifyTableState, setModifyTableState] = React.useState<null | string>(null)
    const [initialFormValues, setInitialFormValues] = React.useState<IUserData>(defaultFormValues)


    React.useEffect(() => {
        if (!tableState.tableData) {
            getUsersList(dispatch, data)
        }
    }, [tableState])

    // console.log(modifyTableState);


    return (
        <>
            <table>
                <thead>
                    <tr>
                        {columnNames.map((item) => {
                            return <th key={item}>{item}</th>;
                        })}
                    </tr>
                </thead>

                <tbody>
                    {tableState.tableData && tableState.tableData.map((user, i) => {
                        return (
                            <tr key={user.login + i}>
                                <td>{user.lastName}</td>
                                <td>{user.firstName}</td>
                                <td>{user.midleName}</td>
                                <td>{user.email}</td>
                                <td>{user.login}</td>
                                <td><button onClick={
                                    // () => deleteUserData(dispatch, i, tableState)
                                    () => {                                        
                                        setModifyTableState(CORRECT_USER_DATA);
                                        setInitialFormValues({
                                            lastName: user.lastName,
                                            firstName: user.firstName,
                                            midleName: user.midleName,
                                            email: user.email,
                                            login: user.login,
                                        })
                                        setModalShow(true);
                                    }
                                }>
                                    CORRECT DATA</button>
                                </td>
                                <td><button onClick={() => deleteUserData(dispatch, i, tableState)}>DELETE</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <Button variant="primary" onClick={() => {
                setModalShow(true)
                setModifyTableState(SET_NEW_USER_DATA);

            }}>
              Launch vertically centered modal
            </Button>

            <TableDataModal
              openState={modalShow}
              setOpenState={setModalShow}
              children={
                <>
                <h1>{
                    (() => {
                        if (modifyTableState === SET_NEW_USER_DATA) {
                            return 'ADD USER';
                        } else if (modifyTableState === CORRECT_USER_DATA) {
                            return 'CORRECT USER';
                        } else {
                            return '';
                        }
                    })()
                }</h1>
                <Formik
                    initialValues={initialFormValues}
                    onSubmit={(values: IUserData, {setSubmitting, resetForm }: FormikHelpers<IUserData>) => {
                        if (modifyTableState === SET_NEW_USER_DATA) {
                            setUserData(dispatch, values, tableState);
                        } else {
                            console.log(values);
                        }
                        setModalShow(false);
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

                        <button type="submit">Submit</button>
                    </Form>
                </Formik>
            </>

              }
            />





        </>
    )
}

export default Table;