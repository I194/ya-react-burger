import { Reducer } from "redux";
import { 
  
  ADD_NEW_USER,
  ADD_TOKENS,
  SET_USER_DATA,
  RESET_PASS_CODE_SENDED,
  PASS_RESET_SUCCESS,
  DELETE_USER_DATA,
  UPDATE_ACC_TOKEN,
  CHANGE_USER_NAME,
  CHANGE_USER_EMAIL,
  CHANGE_USER_PASS,

} from "../actions/user";
import { TUserActions } from "../types/user";

type TInitialState = {

  user: {
    name: string,
    email: string,
    password: string
  },
  accessToken: null,
  refreshToken: null,
  resetPass: boolean,

}

const initialState: TInitialState = {

  user: {
    name: '',
    email: '',
    password: ''
  },
  accessToken: null,
  refreshToken: null,
  resetPass: false,

}

export const userReducer: Reducer = (state = initialState, action: TUserActions) => {
  switch (action.type) {
    case ADD_NEW_USER: {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.user
        },
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      }
    }
    case ADD_TOKENS: {
      return {
        ...state,
        refreshToken: localStorage.refreshToken,
        accessToken: localStorage.accessToken
      }
    }
    case UPDATE_ACC_TOKEN: {
      return {
        ...state,
        accessToken: action.accessToken
      }
    }
    case SET_USER_DATA: {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.user,
        }
      }
    }
    case DELETE_USER_DATA: {
      localStorage.clear();
      return initialState;
    }
    case CHANGE_USER_NAME: {
      return {
        ...state,
        user: {
          ...state.user,
          name: action.name
        }
      }
    }
    case CHANGE_USER_EMAIL: {
      return {
        ...state,
        user: {
          ...state.user,
          email: action.email
        }
      }
    }
    case CHANGE_USER_PASS: {
      return {
        ...state,
        user: {
          ...state.user,
          password: action.password
        }
      }
    }
    case RESET_PASS_CODE_SENDED: {
      return {
        ...state,
        resetPass: true
      }
    }
    case PASS_RESET_SUCCESS: {
      return {
        ...state,
        resetPass: false
      }
    }
    default: {
      return state;
    }
  }
}