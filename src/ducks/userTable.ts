import React from 'react';
// import {IData} from 'components/Table';

const GET_USERS_DATA = 'GET_USERS_DATA';
const DELETE_USER_DATA = 'DELETE_USER_DATA';
export const SET_NEW_USER_DATA = 'SET_NEW_USER_DATA';
export const CORRECT_USER_DATA = 'CORRECT_USER_DATA';

export interface IUserData {
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
    case SET_NEW_USER_DATA:
      return {
        ...state,
        tableData: action.payload,
        }
      default:
        return state
  }
};

type MyActionCreator = (dispatcher: (action: any) => void, state: IReducerRecord, ...params: any) => void;

export const getUsersList: MyActionCreator = (dispatcher, _state, usersList: IUserData[]) => {
    dispatcher({
        type: GET_USERS_DATA,
        payload: usersList,
    })
}

export const deleteUserData: MyActionCreator = (dispatcher, state, userIndex: number) => {
    const prevUsersData = state && state.tableData;
    const updatedUsersData = prevUsersData && [...prevUsersData].filter((_, i) => i !== userIndex);
    dispatcher({
        type: DELETE_USER_DATA,
        payload: updatedUsersData,
    })
}

export const setUserData: MyActionCreator = (dispatcher, state, userData: IUserData) => {
    const prevUsersData = state && state.tableData;
    const updatedUsersData = prevUsersData && [...prevUsersData, userData];
    dispatcher({
        type: SET_NEW_USER_DATA,
        payload: updatedUsersData,
    })
}

export const correctUserData: MyActionCreator = (dispatcher, state, userData: IUserData, index: number) => {
    
  // console.log(userData);
  // console.log(index);
  
  const prevUsersData = state && state.tableData;
    const updatedUsersData = prevUsersData && [...prevUsersData.map((user, i) => {      
      if (i === index) {        
        return {...user, ...userData};
      }
      return user;
    })];

    // console.log(updatedUsersData);


    dispatcher({
        type: SET_NEW_USER_DATA,
        payload: updatedUsersData,
    })
}

