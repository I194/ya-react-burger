import { getIngredients, getOrders, getUserOrders, postOrder } from '../../utils/burger-api';
import { Dispatch } from 'redux';
import { TShopActions } from '../types/shop';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';
export const INCREASE_INGREDIENT_COUNT: 'INCREASE_INGREDIENT_COUNT' = 'INCREASE_INGREDIENT_COUNT';
export const DECREASE_INGREDIENT_COUNT: 'DECREASE_INGREDIENT_COUNT' = 'DECREASE_INGREDIENT_COUNT'; 
export const SET_INGREDIENT_COUNT: 'SET_INGREDIENT_COUNT' = 'SET_INGREDIENT_COUNT';

export const CHANGE_SELECTED_BUN: 'CHANGE_SELECTED_BUN' = 'CHANGE_SELECTED_BUN';
export const ADD_SELECTED_INGREDIENT: 'ADD_SELECTED_INGREDIENT' = 'ADD_SELECTED_INGREDIENT';
export const DELETE_SELECTED_INGREDIENT: 'DELETE_SELECTED_INGREDIENT' = 'DELETE_SELECTED_INGREDIENT'; 
export const SET_SELECTED_INGREDIENTS: 'SET_SELECTED_INGREDIENTS' = 'SET_SELECTED_INGREDIENTS';

export const SET_INGREDIENT_MODAL: 'SET_INGREDIENT_MODAL' = 'SET_INGREDIENT_MODAL';
export const DELETE_INGREDIENT_MODAL: 'DELETE_INGREDIENT_MODAL' = 'DELETE_INGREDIENT_MODAL';

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';

export const GET_ORDERS_REQUEST: 'GET_ORDERS_REQUEST' = 'GET_ORDERS_REQUEST';
export const GET_ORDERS_SUCCESS: 'GET_ORDERS_SUCCESS' = 'GET_ORDERS_SUCCESS';
export const GET_ORDERS_FAILED: 'GET_ORDERS_FAILED' = 'GET_ORDERS_FAILED';

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS'; 
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSE: 'WS_CONNECTION_CLOSE' = 'WS_CONNECTION_CLOSE';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

export function getItems() {
  return function(dispatch: Dispatch<TShopActions>) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    })
    getIngredients()
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res.data
          })
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED,
            error: {message: 'something went wrong...'}
          })
        }
      })
      .catch(e => console.log(e));
  }
}

export function getOrder(ingredientsId: string[]) {
  return function(dispatch: Dispatch<TShopActions>) {
    dispatch({
      type: GET_ORDER_REQUEST,
    })
    postOrder(ingredientsId)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            order: res
          })
          dispatch({
            type: SET_SELECTED_INGREDIENTS,
            ingredients: []
          })
          dispatch({
            type: CHANGE_SELECTED_BUN,
            bunId: null
          })
          // @ts-ignore
          dispatch(getItems())
        } else {
          dispatch({
            type: GET_ORDER_FAILED,
            error: {message: 'something went wrong...'}
          })
        }
      })
      .catch(e => console.log(e));
  }
}

export function getOrdersFeed() {
  return function(dispatch: Dispatch<TShopActions>) {
    dispatch({
      type: GET_ORDERS_REQUEST,
    })
    getOrders()
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDERS_SUCCESS,
            orders: res.orders,
            total: res.total,
            today: res.totalToday
          })
        } else {
          dispatch({
            type: GET_ORDERS_FAILED,
            error: {message: 'something went wrong...'}
          })
        }
      })
      .catch(e => console.log(e))
  }
}

export function getOrdersFeedUser() {
  return function(dispatch: Dispatch<TShopActions>) {
    dispatch({
      type: GET_ORDERS_REQUEST,
    })
    getUserOrders()
      .then(res => {
        console.log(res);
        if (res && res.success) {
          dispatch({
            type: GET_ORDERS_SUCCESS,
            orders: res.orders,
            total: res.total,
            today: res.totalToday
          })
        } else {
          dispatch({
            type: GET_ORDERS_FAILED,
            error: {message: 'something went wrong...'}
          })
        }
      })
      .catch(e => console.log(e))
  }
}