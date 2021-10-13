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

import { userReducer } from "./user";

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual(
      {
        user: {
          name: '',
          email: '',
          password: ''
        },
        accessToken: null,
        refreshToken: null,
        resetPass: false,
      }
    )
  });
  it('should handle ADD_NEW_USER', () => {
    expect(userReducer({}, {
      type: ADD_NEW_USER,
      user: {name: 'name', email: 'email@mail.com', password: 'pass123'},
      accessToken: 'accessToken',
      refreshToken: 'refreshToken'
    })).toEqual(
      {
        user: {
          name: 'name',
          email: 'email@mail.com',
          password: 'pass123'
        },
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      }
    )
  });
  it(`should handle ADD_TOKENS`, () => {
    expect(userReducer({}, {
      type: ADD_TOKENS,
      accessToken: localStorage.accessToken,
      refreshToken: localStorage.refreshToken,
    })).toEqual(
      {
        accessToken: localStorage.accessToken,
        refreshToken: localStorage.refreshToken,
      }
    )
  });
  it('should handle UPDATE_ACC_TOKEN', () => {
    expect(userReducer({}, {
      type: UPDATE_ACC_TOKEN,
      accessToken: 'accessToken'
    })).toEqual(
      {
        accessToken: 'accessToken'
      }
    )
  });
  it('should handle SET_USER_DATA', () => {
    expect(userReducer({}, {
      type: SET_USER_DATA,
      user: {name: 'name', email: 'email@mail.com', password: 'pass123'},
    })).toEqual(
      {
        user: {
          name: 'name',
          email: 'email@mail.com',
          password: 'pass123'
        },
      }
    )
  });
  it('should handle DELETE_USER_DATA', () => {
    expect(userReducer({}, {
      type: DELETE_USER_DATA,
    })).toEqual(
      {
        user: {
          name: '',
          email: '',
          password: ''
        },
        accessToken: null,
        refreshToken: null,
        resetPass: false,
      }
    )
  });
  it('should handle CHANGE_USER_NAME', () => {
    expect(userReducer({}, {
      type: CHANGE_USER_NAME,
      name: 'name'
    })).toEqual(
      {
        user: {
          name: 'name'
        }
      }
    )
  });
  it('should handle CHANGE_USER_EMAIL', () => {
    expect(userReducer({}, {
      type: CHANGE_USER_EMAIL,
      email: 'email@mail.com'
    })).toEqual(
      {
        user: {
          email: 'email@mail.com'
        }
      }
    )
  });
  it('should handle CHANGE_USER_PASS', () => {
    expect(userReducer({}, {
      type: CHANGE_USER_PASS,
      password: 'pass123'
    })).toEqual(
      {
        user: {
          password: 'pass123'
        }
      }
    )
  });
  it('should handle RESET_PASS_CODE_SENDED', () => {
    expect(userReducer({}, {
      type: RESET_PASS_CODE_SENDED,
      resetPass: true
    })).toEqual(
      {
        resetPass: true
      }
    )
  });
  it('should handle PASS_RESET_SUCCESS', () => {
    expect(userReducer({}, {
      type: PASS_RESET_SUCCESS,
      resetPass: false
    })).toEqual(
      {
        resetPass: false
      }
    )
  });
})