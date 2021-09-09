import React from 'react';

const GET_USERS_DATA = 'GET_USERS_DATA';
const DELETE_USER_DATA = 'DELETE_USER_DATA';
export const SET_NEW_USER_DATA = 'SET_NEW_USER_DATA';
export const CORRECT_USER_DATA = 'CORRECT_USER_DATA';

export interface IUserData {
    [property: string]: string,
    lastName: string,
    firstName: string,
    midleName: string,
    email: string,
    login: string,
}

export type usersTableAction = {type: string, payload: null | IUserData[]}

export interface IReducerRecord {
    tableData: null | IUserData[];
}

export const reducerRecord: IReducerRecord = {
    tableData: null,
};

export const reducer: React.Reducer<IReducerRecord, usersTableAction> = (state, action) => {
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

type usersTableActionCreator = (dispatcher: (action: any) => void, state: IReducerRecord, ...params: any) => void;

export const getUsersList: usersTableActionCreator = (dispatcher, _state, usersList: IUserData[]) => {    
  const action: usersTableAction = {
    type: GET_USERS_DATA,
    payload: usersList,
  }
  dispatcher(action)
}

export const deleteUserData: usersTableActionCreator = (dispatcher, state, userIndex: number) => {
    const prevUsersData = state && state.tableData;
    const updatedUsersData = prevUsersData && [...prevUsersData].filter((_, i) => i !== userIndex);
    
    const action: usersTableAction = {
      type: DELETE_USER_DATA,
      payload: updatedUsersData,
    }
    dispatcher(action)
}

export const setUserData: usersTableActionCreator = (dispatcher, state, userData: IUserData) => {
    const prevUsersData = state && state.tableData;
    const updatedUsersData = prevUsersData && [...prevUsersData, userData];
    
    const action: usersTableAction = {
      type: SET_NEW_USER_DATA,
      payload: updatedUsersData,
    }    
    dispatcher(action)
}

export const correctUserData: usersTableActionCreator = (dispatcher, state, userData: IUserData, index: number) => {      
  const prevUsersData = state && state.tableData;
    const updatedUsersData = prevUsersData && [...prevUsersData.map((user, i) => {      
      if (i === index) {        
        return {...user, ...userData};
      }
      return user;
    })];

    const action: usersTableAction = {
      type: SET_NEW_USER_DATA,
      payload: updatedUsersData,
    };

    dispatcher(action);
}

