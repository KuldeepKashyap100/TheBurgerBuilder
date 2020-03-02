import * as actionTypes from "../actions/actions";

const inititalState = {
  ingredients: {
    cheese: 0,
    meat: 0,
    salad: 0,
    bacon: 0
  },
  totalPrice: 4
};
const INGREDIENT_PRICES = {
  cheese: 0.5,
  meat: 1.3,
  salad: 0.6,
  bacon: 1
};

const reducer = (state = inititalState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
          ...state,
          ingredients:{
              ...state.ingredients,
              [action.ingredientType]:state.ingredients[action.ingredientType] + 1
          },
          totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType]
      };
    default:
        return state;
  }
};

export default reducer;
