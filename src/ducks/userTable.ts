import React from 'react';
import {IData} from 'components/Table';

const GET_USERS_DATA = 'GET_USERS_DATA';
const DELETE_USER_DATA = 'DELETE_USER_DATA';

interface IUserData {
    lastName: string,
    firstName: string,
    midleName: string,
    email: string,
    login: string,    
}

interface IReducerRecord {
    tableData: null | IUserData[];
}

export const reducerRecord: IReducerRecord = {
    tableData: null,
};

export const reducer: React.Reducer<IReducerRecord, React.ReducerAction<any>> = (state, action: any) => {
  switch (action.type) {
    case GET_USERS_DATA:
      return {
        ...state,
        tableData: action.payload,
        }
    case DELETE_USER_DATA:
      return {
        ...state,
        tableData: action.payload,
        }
      default:
        return state
  }
};

type MyActionCreator = (dispatcher: (action: any) => void, params?: any, state?: IReducerRecord) => void;

export const getUsersList: MyActionCreator = (dispatcher, usersList: IData[]) => {
    dispatcher({
        type: GET_USERS_DATA,
        payload: usersList,
    })
}

export const deleteUserData: MyActionCreator = (dispatcher, userIndex: number, state) => {
    const prevUsersData = state && state.tableData;
    const updatedUsersData = prevUsersData && [...prevUsersData].filter((_, i) => i !== userIndex);
    dispatcher({
        type: DELETE_USER_DATA,
        payload: updatedUsersData,
    })
}

