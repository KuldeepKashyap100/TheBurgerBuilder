import * as actionTypes from "./actionTypes";
import axios from "axios";
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};
export const authSuccess = (token, userId) => {
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
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOG_OUT
  };
};

export const checkAuthTimeOut = expiryPeriod => {
  return dispatch => {
    setTimeout(() => dispatch(logOut()), expiryPeriod * 1000);
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
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
        let expirationDate = new Date(
          new Date().getTime() + parseInt(response.data.expiresIn) * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeOut(response.data.expiresIn));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    let token = localStorage.getItem('token');
    if(!token){
      dispatch(logOut());
    }
    else{
      let expirationDate = new Date(localStorage.getItem('expirationDate'));
      if(expirationDate<new Date()){
        dispatch(logOut());
      }
      else {
        let userId = localStorage.getItem('userId');
        dispatch(authSuccess(token,userId));
        dispatch(checkAuthTimeOut((expirationDate.getTime()-new Date().getTime())/1000));
      }
    }
  };
};