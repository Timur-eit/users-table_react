import React from "react";
import './style.scss';
import { 
    reducer,
    reducerRecord,
    getUsersList,
    deleteUserData,
} from 'ducks/userTable';


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
    const [state, dispatch] = React.useReducer(reducer, reducerRecord)

    
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
                            <tr key={user.login}>
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

            {/* <button onClick={() => getInitialUserList(data)}>Get Data</button> */}
        </>
    )
}

export default Table;