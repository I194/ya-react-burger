import { getIngredients, postOrder } from '../../utils/burger-api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const INCREASE_INGREDIENT_COUNT = 'INCRESE_INGREDIENT_COUNT';
export const DECREASE_INGREDIENT_COUNT = 'DECREASE_INGREDIENT_COUNT'; 
export const SET_INGREDIENT_COUNT = 'SET_INGREDIENT_COUNT';

export const CHANGE_SELECTED_BUN = 'CHANGE_SELECTED_BUN';
export const ADD_SELECTED_INGREDIENT = 'ADD_SELECTED_INGREDIENT';
export const DELETE_SELECTED_INGREDIENT = 'DELETE_SELECTED_INGREDIENT'; 
export const SET_SELECTED_INGREDIENTS = 'SET_SELECTED_INGREDIENTS';

// export const GET_SELECTED_INGREDIENTS_REQUEST = 'GET_SELECTED_INGREDIENTS_REQUEST';
// export const GET_SELECTED_INGREDIENTS_SUCCESS = 'GET_SELECTED_INGREDIENTS_SUCCESS';
// export const GET_SELECTED_INGREDIENTS_FAILED = 'GET_SELECTED_INGREDIENTS_FAILED';

export const SET_INGREDIENT_MODAL = 'SET_INGREDIENT_MODAL';
export const DELETE_INGREDIENT_MODAL = 'DELETE_INGREDIENT_MODAL';

export const GET_ORDER_REQUEST = 'GET_ORDER_ID_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_ID_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_ID_FAILED';

export function getItems() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    })
    getIngredients().then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data
        })
        dispatch({
          type: SET_INGREDIENT_COUNT,
          id: "60d3b41abdacab0026a733c6",
          count: 2,
        })
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        })
      }
    })
  }
}

export function getOrder(ingredientsId) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    })
    postOrder(ingredientsId).then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res
        })
      } else {
        dispatch({
          type: GET_ORDER_FAILED
        })
      }
    })
  }
}