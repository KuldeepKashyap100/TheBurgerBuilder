import * as actionTypes from "../actions/actionTypes";
import updatedObject from "../utility";
import { setIngredients } from "../actions/burgerBuilder";

const inititalState = {
  ingredients: null,
  totalPrice: 4,
  apiFailed: false
};
const INGREDIENT_PRICES = {
  cheese: 0.5,
  meat: 1.3,
  salad: 0.6,
  bacon: 1
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientType]: state.ingredients[action.ingredientType] + 1
  };
  const updatedIngredients = updatedObject(
    state.ingredients,
    updatedIngredient
  );
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType]
  };
  return updatedObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.ingredientType]: state.ingredients[action.ingredientType] - 1
    },
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType]
  };
};
const setIngredient = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...action.ingredients
    },
    apiFailed: false,
    totalPrice: 4
  };
};

const fetchIngredientFailed = (state, action) => {
  return {
    ...state,
    apiFailed: true
  };
};

const burgerBuilderReducer = (state = inititalState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredient(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientFailed(state, action);
    default:
      return state;
  }
};
export default burgerBuilderReducer;
