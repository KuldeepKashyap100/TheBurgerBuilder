import * as actionTypes from "./actionTypes";
import axios from "axios";
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};
export const authSuccess = (token,userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId
  };
};
export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error.message
  };
};

export const logOut = () => {
    return {
        type: actionTypes.AUTH_LOG_OUT
    };
};

export const checkAuthTimeOut = (expiryPeriod) => {
    return dispatch => {
        setTimeout(()=>dispatch(logOut()),expiryPeriod*1000); 
    }; 
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAAh4hLa_M_g6OXYflKnrqDX5o0naiGvwY";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAAh4hLa_M_g6OXYflKnrqDX5o0naiGvwY";
    }
    axios
      .post(url, authData)
      .then(response => {
        dispatch(authSuccess(response.data.idToken,response.data.localId));
        dispatch(checkAuthTimeOut(response.data.expiresIn));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      });
  };
};
