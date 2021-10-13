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

const initialState = {

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

export const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    // All ingredinets (ingredients in BurgerIngredients)
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredients: action.ingredients
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      }
    }
    case INCREASE_INGREDIENT_COUNT: {
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) => {
          if (ingredient._id === action.id) {
            return {
              ...ingredient,
              __v: ingredient.__v + 1
            }
          } else {
            return ingredient
          }
        })
      }
    }
    case DECREASE_INGREDIENT_COUNT: {
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) => {
          if (ingredient._id === action.id) {
            return {
              ...ingredient,
              __v: ingredient.__v - 1
            }
          } else {
            return ingredient
          }
        })
      }
    }
    case SET_INGREDIENT_COUNT: {
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) => {
          if (ingredient._id === action.id) {
            return {
              ...ingredient,
              __v: action.count
            }
          } else {
            return ingredient
          }
        })
      }
    }
    // Selected ingredinets (ingredients in BurgerConstructor)
    case CHANGE_SELECTED_BUN: {
      return {
        ...state,
        selectedBun: {...state.selectedBun, id: action.bunId}
      }
    }
    case ADD_SELECTED_INGREDIENT: {
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, action.ingredient]
      }
    }
    case DELETE_SELECTED_INGREDIENT: {
      return {
        ...state,
        selectedIngredients: state.selectedIngredients.filter(ingredient => ingredient.uid !== action.uid)
      }
    }
    case SET_SELECTED_INGREDIENTS: {
      return {
        ...state,
        selectedIngredients: action.ingredients
      }
    }
    // Currently watching ingredient (in Modal)
    case SET_INGREDIENT_MODAL: {
      return {
        ...state,
        currentIngredient: action.ingredient
      }
    }
    case DELETE_INGREDIENT_MODAL: {
      return {
        ...state, 
        currentIngredient: {}
      }
    }
    // Currently created order (in OrderDetails)
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      }
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        order: action.order
      }
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      }
    }
    // Orders in feed and orders history
    case GET_ORDERS_REQUEST: {
      return {
        ...state,
        ordersRequest: true
      }
    }
    case GET_ORDERS_SUCCESS: {
      console.log(action)
      return {
        ...state,
        ordersRequest: false,
        ordersFailed: false,
        orders: action.orders,
        totalOrders: action.total,
        todayOrders: action.today
      }
    }
    case GET_ORDERS_FAILED: {
      return {
        ...state,
        ordersRequest: false,
        ordersFailed: true,
      }
    }
    // web socket
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        error: null,
        wsConnected: true
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
                error: null,
        wsConnected: false
      };
    }
    case WS_GET_MESSAGE: {
      return {
        ...state,
        error: null,
        messages: state.messages.length
          ? [...state.messages, action.payload]
          : [action.payload]
      };
    }
    default: {
      return state;
    }
  }
}