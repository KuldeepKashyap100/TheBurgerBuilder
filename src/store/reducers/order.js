import * as actionTypes from "../actions/actionTypes";
import updatedObject from "../utility";
const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const purchaseInit = (state, action) => {
  return updatedObject(state, { purchased: false });
};

const purchaseBurgerStart = (state, action) => {
  return updatedObject(state, { loading: true });
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    orderId: action.orderId
  };
  const updatedState = {
    ...state,
    orders: state.orders.concat(newOrder),
    loading: false,
    purchased: true
  };
  return updatedObject(state, updatedState);
};

const purchaseBurgerFail = (state, action) => {
  return updatedObject(state, { loading: false });
};

const fetchOrdersStart = (state, action) => {
  return updatedObject(state, { loading: true });
};

const fetchOrdersSuccess = (state, action) => {
  return updatedObject(state, { orders: action.orders, loading: false });
};

const fetchOrdersFail = (state, action) => {
  return updatedObject(state, { loading: false });
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAILED:
      return fetchOrdersFail(state, action);
    default:
      return state;
  }
};
export default orderReducer;
