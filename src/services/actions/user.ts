import { getAccToken, getUser, postAuth, postLogout, postNewPass, postNewUser, postResetPassCode } from "../../utils/burger-api";
import { Dispatch } from "redux";
import { TUserActions } from "../types/user";

export const ADD_NEW_USER = 'ADD_NEW_USER';
export const ADD_TOKENS = 'ADD_TOKENS'; 
export const UPDATE_ACC_TOKEN = 'UPDATE_ACC_TOKEN';
export const SET_USER_DATA = 'SET_USER_DATA';
export const RESET_PASS_CODE_SENDED = 'SET_EMAIL_FOR_RESET_PASS';
export const PASS_RESET_SUCCESS = 'PASS_RESET_SUCCESS';
export const DELETE_USER_DATA = 'DELETE_USER_DATA';
export const CHANGE_USER_NAME = 'CHANGE_USER_NAME';
export const CHANGE_USER_EMAIL = 'CHANGE_USER_EMAIL';
export const CHANGE_USER_PASS = 'CHANGE_USER_PASS';

export function addTokens(email: string, pass: string) {
  return function(disptach: Dispatch<TUserActions>) {
    postAuth(email, pass)
      .then(res => {
        if (res && res.success) {
          localStorage.setItem('refreshToken', res.refreshToken);
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('initTime', String(Date.now() / 1000))
          console.log(localStorage)
          disptach({type: ADD_TOKENS});
        }
      })
      .catch(e => console.log(e));
  }
}

export function updateAccToken() {
  return function(dispatch: Dispatch<TUserActions>) {
    console.log(localStorage)
    getAccToken(localStorage.refreshToken)
      .then(res => {
        console.log('hey')
        if (res && res.success) {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('initTime', String(Date.now() / 1000))
          dispatch({type: UPDATE_ACC_TOKEN, accessToken: res.accessToken})
        }
      })
      .catch(e => console.log(e));
  }
}

export function getUserData() {
  return function(dispatch: Dispatch<TUserActions>) {
    getUser()
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: SET_USER_DATA,
            user: res.user
          })
        }
      })
      .catch(e => console.log(e));
  }
}

export function deleteUserData(token: string) {
  return function(dispatch: Dispatch<TUserActions>) {
    postLogout(token)
      .then(res => {
        if (res && res.success) {
          dispatch({type: DELETE_USER_DATA});
        } 
      })
      .catch(e => console.log(e));
  }
}

export function sendResetPassCode(email: string) {
  return function(dispatch: Dispatch<TUserActions>) {
    postResetPassCode(email)
      .then(res => {
        if (res && res.success) {
          dispatch({type: RESET_PASS_CODE_SENDED})
        }
      })
      .catch(e => console.log(e));
  }
}

export function setNewPass(pass: string, code: string) {
  return function(dispatch: Dispatch<TUserActions>) {
    postNewPass(pass, code)
      .then(res => {
        if (res && res.success) {
          dispatch({type: PASS_RESET_SUCCESS})
        }
      })
      .catch(e => console.log(e));
  }
}

export function addNewUser(email: string, pass: string, name: string) {
  return function(dispatch: Dispatch<TUserActions>) {
    postNewUser(email, pass, name)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: ADD_NEW_USER,
            user: res.user,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken
          })
        } 
      })
      .catch(e => console.log(e));
  }
}
