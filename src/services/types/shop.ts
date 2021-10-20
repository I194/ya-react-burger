import {

  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREASE_INGREDIENT_COUNT,
  DECREASE_INGREDIENT_COUNT,
  SET_INGREDIENT_COUNT,

  CHANGE_SELECTED_BUN,
  ADD_SELECTED_INGREDIENT,
  DELETE_SELECTED_INGREDIENT,
  SET_SELECTED_INGREDIENTS,

  SET_INGREDIENT_MODAL,
  DELETE_INGREDIENT_MODAL,

  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,

  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILED,

  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,

} from '../actions/shop';
import { IIngredient, IOrder } from './components';

// INGREDIENTS 1

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST
}

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS,
  readonly ingredients: Array<IIngredient>
}

export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED,
  readonly error: object
}

// INGREDIENTS 2

export interface IIncreaseIngredientCount {
  readonly type: typeof INCREASE_INGREDIENT_COUNT,
  readonly id: string
}

export interface IDecreaseIngredientCount {
  readonly type: typeof DECREASE_INGREDIENT_COUNT,
  readonly id: string
}

export interface ISetIngredientCount {
  readonly type: typeof SET_INGREDIENT_COUNT,
  readonly id: string,
  readonly count: number
}

// INGREDIENTS 3

export interface IChangeSelectedBun {
  readonly type: typeof CHANGE_SELECTED_BUN,
  readonly bunId: string | null
}

export interface IAddSelectedIngredient {
  readonly type: typeof ADD_SELECTED_INGREDIENT,
  readonly ingredient: IIngredient
}

export interface IDeleteSelectedIngredient {
  readonly type: typeof DELETE_SELECTED_INGREDIENT,
  readonly uid: string
}

export interface ISetSelectedIngredients {
  readonly type: typeof SET_SELECTED_INGREDIENTS,
  readonly ingredients: Array<IIngredient>
}

// MODAL

export interface ISetIngredientModal {
  readonly type: typeof SET_INGREDIENT_MODAL,
  readonly ingredient: IIngredient
}

export interface IDeleteIngredientModal {
  readonly type: typeof DELETE_INGREDIENT_MODAL
}

// ORDER

export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST
}

export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS,
  readonly order: IOrder
}

export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
  readonly error: object
}

// ORDERS

export interface IGetOrdersRequest {
  readonly type: typeof GET_ORDERS_REQUEST
}

export interface IGetOrdersSuccess {
  readonly type: typeof GET_ORDERS_SUCCESS,
  readonly orders: Array<IOrder>,
  readonly total: number,
  readonly today: number
}

export interface IGetOrdersFailed {
  readonly type: typeof GET_ORDERS_FAILED;
  readonly error: object
}

// WS

export interface IWSConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS
}

export interface IWSConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR,
  readonly payload: object
}

export interface IWSConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED
}

export interface IWSGetMessage {
  readonly type: typeof WS_GET_MESSAGE,
  readonly payload: object
}

export type TShopActions = 
  | IGetIngredientsRequest
  | IGetIngredientsSuccess
  | IGetIngredientsFailed
  | IIncreaseIngredientCount
  | IDecreaseIngredientCount
  | ISetIngredientCount
  | IChangeSelectedBun
  | IAddSelectedIngredient
  | IDeleteSelectedIngredient
  | ISetSelectedIngredients
  | ISetIngredientModal
  | IDeleteIngredientModal
  | IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderFailed
  | IGetOrdersRequest
  | IGetOrdersSuccess
  | IGetOrdersFailed
  | IWSConnectionSuccess
  | IWSConnectionError
  | IWSConnectionClosed
  | IWSGetMessage
