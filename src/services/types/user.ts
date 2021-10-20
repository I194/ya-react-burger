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

export interface IAddNewUser {
  readonly type: typeof ADD_NEW_USER,
  readonly user: object,
  readonly accessToken: string,
  readonly refreshToken: string
}

export interface IAddTokens {
  readonly type: typeof ADD_TOKENS
}

export interface ISetUserData {
  readonly type: typeof SET_USER_DATA,
  readonly user: object
}

export interface IResetPassCodeSended {
  readonly type: typeof RESET_PASS_CODE_SENDED
}

export interface IPassResetSuccess {
  readonly type: typeof PASS_RESET_SUCCESS
}

export interface IDeleteUserData {
  readonly type: typeof DELETE_USER_DATA
}

export interface IUpdateAccToken {
  readonly type: typeof UPDATE_ACC_TOKEN,
  readonly accessToken: string
}

export interface IChangeUserName {
  readonly type: typeof CHANGE_USER_NAME,
  readonly name: string
}

export interface IChangeUserEmail {
  readonly type: typeof CHANGE_USER_EMAIL,
  readonly email: string
}

export interface IChangeUserPass {
  readonly type: typeof CHANGE_USER_PASS,
  readonly password: string
}

export type TUserActions = 
  | IAddNewUser
  | IAddTokens
  | ISetUserData
  | IResetPassCodeSended
  | IPassResetSuccess
  | IDeleteUserData
  | IUpdateAccToken
  | IChangeUserName
  | IChangeUserEmail
  | IChangeUserPass