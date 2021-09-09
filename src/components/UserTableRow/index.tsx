import React from 'react';
import {IUserData} from 'ducks/userTable'

interface IUserTableRowProps {
    user: IUserData,
    userIndex: number,
    correctDataAction: (user: IUserData, usrIndex: number) => void,
    prepareToDeleteUserDataAction: (usrIndex: number) => void
}

function UserTableRow(props: IUserTableRowProps) {
    const {
        user,
        userIndex,
        correctDataAction,
        prepareToDeleteUserDataAction
    } = props;

    return (
        <tr key={user.login + userIndex}>
            {Object.keys(user).map((userData, i) => {
                return <td key={userData + i}>{user[userData]}</td>
            })}
            <td>
                <button onClick={() => correctDataAction(user, userIndex)}>
                    CORRECT DATA
                </button>
            </td>
            <td>
                <button onClick={() => prepareToDeleteUserDataAction(userIndex)}>
                    DELETE
                </button>
            </td>
        </tr>
    )
}

export default UserTableRow;