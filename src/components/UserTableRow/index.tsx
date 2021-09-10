import React from 'react';
import { IUserData } from 'ducks/userTable';

import correctDataBtnImg from 'shared/img/correct-data-button.svg';
import deleteBtnImg from 'shared/img/delete-button.svg';

import './style.scss';

interface IUserTableRowProps {
    user: IUserData;
    userIndex: number;
    correctDataAction: (user: IUserData, usrIndex: number) => void;
    prepareToDeleteUserDataAction: (usrIndex: number) => void;
}

function UserTableRow(props: IUserTableRowProps) {
    const { user, userIndex, correctDataAction, prepareToDeleteUserDataAction } = props;

    return (
        <tr className="tbdoy-row" key={user.login + userIndex}>
            {Object.keys(user).map((userData, i) => {
                return <td key={userData + i}>{user[userData]}</td>;
            })}
            <td className="tbdoy-row__control-panel">
                <img
                    src={correctDataBtnImg}
                    alt="correct data"
                    onClick={() => correctDataAction(user, userIndex)}
                />
                <img
                    src={deleteBtnImg}
                    alt="delete data"
                    onClick={() => prepareToDeleteUserDataAction(userIndex)}
                />
            </td>
        </tr>
    );
}

export default UserTableRow;
