import {

  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
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

import { shopReducer } from "./shop";

describe('shop reducer', () => {
  it('should return the initial state', () => {
    expect(shopReducer(undefined, {})).toEqual(
      {
        ingredients: [],
        ingredientsRequest: false,
        ingredientsFailed: false,
      
        selectedBun: {id: null, uid: 0},
        selectedIngredients: [],
        selectedIngredientsRequest: false,
        selectedIngredientsFailed: false,
      
        currentIngredient: {},
      
        order: null,
        orderRequest: false,
        orderFailed: false,
      
        orders: [],
        totalOrders: null,
        todayOrders: null,
        ordersRequest: false,
        ordersFailed: false,
      
        wsConnected: false,
        messages: [],
        error: '',      
      }
    )
  });
  it('should return GET_INGREDIENTS_REQUEST', () => {
    expect(shopReducer({}, {
      type: GET_INGREDIENTS_REQUEST,
      ingredientsRequest: true
    })).toEqual(
      {
        ingredientsRequest: true,
      }
    )
  });
  it('should return GET_INGREDIENTS_SUCCESS', () => {
    expect(shopReducer({}, {
      type: GET_INGREDIENTS_SUCCESS,
      ingredientsRequest: false,
      ingredientsFailed: false,
      ingredients: {},
    })).toEqual(
      {
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredients: {},
      }
    )
  });
  it('should return GET_INGREDIENTS_FAILED', () => {
    expect(shopReducer({}, {
      type: GET_INGREDIENTS_FAILED,
      ingredientsRequest: false,
      ingredientsFailed: true,
    })).toEqual(
      {
        ingredientsRequest: false,
        ingredientsFailed: true,
      }
    )
  });
  it('should return INCREASE_INGREDIENT_COUNT', () => {
    expect(shopReducer({ingredients: [{_id: 1, __v: 0}]}, {
      type: INCREASE_INGREDIENT_COUNT,
      id: 1
    })).toEqual(
      {
        ingredients: [{_id: 1, __v: 1}]
      }
    )
  });
  it('should return DECREASE_INGREDIENT_COUNT', () => {
    expect(shopReducer({ingredients: [{_id: 1, __v: 1}]}, {
      type: DECREASE_INGREDIENT_COUNT,
      id: 1
    })).toEqual(
      {
        ingredients: [{_id: 1, __v: 0}]
      }
    )
  });
  it('should return SET_INGREDIENT_COUNT', () => {
    expect(shopReducer({ingredients: [{_id: 1, __v: 1}]}, {
      type: SET_INGREDIENT_COUNT,
      id: 1,
      count: 3
    })).toEqual(
      {
        ingredients: [{_id: 1, __v: 3}]
      }
    )
  });
  it('should return CHANGE_SELECTED_BUN', () => {
    expect(shopReducer({}, {
      type: CHANGE_SELECTED_BUN,
      bunId: 1
    })).toEqual(
      {
        selectedBun: {id: 1}
      }
    )
  });
  it('should return ADD_SELECTED_INGREDIENT', () => {
    expect(shopReducer({selectedIngredients: []}, {
      type: ADD_SELECTED_INGREDIENT,
      ingredient: {a: 1}
    })).toEqual(
      {
        selectedIngredients: [{a: 1}]
      }
    )
  });
  it('should return DELETE_SELECTED_INGREDIENT', () => {
    expect(shopReducer({selectedIngredients: [{uid: 1}]}, {
      type: DELETE_SELECTED_INGREDIENT,
      uid: 1
    })).toEqual(
      {
        selectedIngredients: []
      }
    )
  });
  it('should return SET_SELECTED_INGREDIENTS', () => {
    expect(shopReducer({selectedIngredients: []}, {
      type: SET_SELECTED_INGREDIENTS,
      ingredients: [{a: 1}]
    })).toEqual(
      {
        selectedIngredients: [{a: 1}]
      }
    )
  });
  it('should return SET_INGREDIENT_MODAL', () => {
    expect(shopReducer({}, {
      type: SET_INGREDIENT_MODAL,
      ingredient: {a: 1}
    })).toEqual(
      {
        currentIngredient: {a: 1}
      }
    )
  }); 
  it('should return DELETE_INGREDIENT_MODAL', () => {
    expect(shopReducer({}, {
      type: DELETE_INGREDIENT_MODAL
    })).toEqual(
      {
        currentIngredient: {}
      }
    )
  }); 
  it('should return GET_ORDER_REQUEST', () => {
    expect(shopReducer({}, {
      type: GET_ORDER_REQUEST
    })).toEqual(
      {
        orderRequest: true
      }
    )
  }); 
  it('should return GET_ORDER_SUCCESS', () => {
    expect(shopReducer({}, {
      type: GET_ORDER_SUCCESS,
      order: {a: 1}
    })).toEqual(
      {
        orderRequest: false,
        orderFailed: false,
        order: {a: 1}
      }
    )
  }); 
  it('should return GET_ORDER_FAILED', () => {
    expect(shopReducer({}, {
      type: GET_ORDER_FAILED
    })).toEqual(
      {        
        orderRequest: false,
        orderFailed: true,
      }
    )
  }); 
  it('should return GET_ORDERS_REQUEST', () => {
    expect(shopReducer({}, {
      type: GET_ORDERS_REQUEST
    })).toEqual(
      {        
        ordersRequest: true
      }
    )
  }); 
  it('should return GET_ORDERS_SUCCESS', () => {
    expect(shopReducer({}, {
      type: GET_ORDERS_SUCCESS,
      orders: [],
      total: 2,
      today: 1
    })).toEqual(
      {        
        ordersRequest: false,
        ordersFailed: false,
        orders: [],
        totalOrders: 2,
        todayOrders: 1
      }
    )
  }); 
  it('should return GET_ORDERS_FAILED', () => {
    expect(shopReducer({}, {
      type: GET_ORDERS_FAILED
    })).toEqual(
      {        
        ordersRequest: false,
        ordersFailed: true,
      }
    )
  }); 
  it('should return WS_CONNECTION_SUCCESS', () => {
    expect(shopReducer({}, {
      type: WS_CONNECTION_SUCCESS
    })).toEqual(
      {        
        error: null,
        wsConnected: true
      }
    )
  }); 
  it('should return WS_CONNECTION_ERROR', () => {
    expect(shopReducer({}, {
      type: WS_CONNECTION_ERROR,
      payload: {what: 1}
    })).toEqual(
      {        
        error: {what: 1},
        wsConnected: false
      }
    )
  }); 
  it('should return WS_CONNECTION_CLOSED', () => {
    expect(shopReducer({}, {
      type: WS_CONNECTION_CLOSED
    })).toEqual(
      {        
        error: null,
        wsConnected: false
      }
    )
  }); 
  it('should return WS_GET_MESSAGE', () => {
    expect(shopReducer({messages: []}, {
      type: WS_GET_MESSAGE,
      payload: {what: 1}
    })).toEqual(
      {        
        error: null,
        messages: [{what: 1}]
      }
    )
  }); 
})