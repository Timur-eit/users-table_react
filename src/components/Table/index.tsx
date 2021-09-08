import React from "react";
import {Button, Modal} from 'react-bootstrap';
import AddDataModal from 'components/AddDataModal';

import './style.scss';
import {
    IUserData,
    reducer,
    reducerRecord,
    getUsersList,
    deleteUserData,
    setUserData,
} from 'ducks/userTable';

import { Formik, Field, Form, FormikHelpers } from 'formik';


interface ITableProps {
    [poperty: string]: any
}

const columnNames: string[] = ['Фамилия', 'Имя', 'Отчество', 'E-mail', 'Логин'];

export interface IData {
    [property: string]: string,
}

const data: IData[] = [
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
    const [state, dispatch] = React.useReducer(reducer, reducerRecord);
    const [modalShow, setModalShow] = React.useState(false);


    React.useEffect(() => {
        if (!state.tableData) {
            getUsersList(dispatch, data)
        }
    }, [state])

    console.log(state.tableData)


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
                    {state.tableData && state.tableData.map((user, i) => {
                        return (
                            <tr key={user.login + i}>
                                <td>{user.lastName}</td>
                                <td>{user.firstName}</td>
                                <td>{user.midleName}</td>
                                <td>{user.email}</td>
                                <td>{user.login}</td>
                                <td><button onClick={() => deleteUserData(dispatch, i, state)}>DELETE</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <>
                <h1>ADD NEW USER</h1>
                <Formik
                    initialValues={{
                        lastName: '',
                        firstName: '',
                        midleName: '',
                        email: '',
                        login: '',
                    }}
                    onSubmit={(values: IUserData, {setSubmitting}: FormikHelpers<IUserData>) => {
                        setUserData(dispatch, values, state);
                        console.log(values);
                        setSubmitting(false)
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



            <Button variant="primary" onClick={() => setModalShow(true)}>
              Launch vertically centered modal
            </Button>

            <AddDataModal
              openState={modalShow}
              setOpenState={setModalShow}
            />





        </>
    )
}

export default Table;