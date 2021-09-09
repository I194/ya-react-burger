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

  // GET_SELECTED_INGREDIENTS_FAILED,
  // GET_SELECTED_INGREDIENTS_REQUEST,
  // GET_SELECTED_INGREDIENTS_SUCCESS,

  SET_INGREDIENT_MODAL,
  DELETE_INGREDIENT_MODAL,

  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,

} from '../actions/shop';

const initialState = {

  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  selectedBun: {id: "60d3b41abdacab0026a733c6", uid: 0},
  selectedIngredients: [],
  selectedIngredientsRequest: false,
  selectedIngredientsFailed: false,

  currentIngredient: {},

  order: null,
  orderRequest: false,
  orderFailed: false,

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
    default: {
      return state;
    }
  }
}