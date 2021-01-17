import { createAction } from "@reduxjs/toolkit";
import { postCall } from "../util/restCall";
import { fetchUserData } from "./../redux-store/userActions";

const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAIL = "LOGIN_FAIL";
const LOGOUT = "LOGOUT";

const loginRequest = createAction(LOGIN_REQUEST);
const loginSuccess = createAction(LOGIN_SUCCESS);
const loginFailed = createAction(LOGIN_FAIL);

const logout = createAction(LOGOUT);

export const authenticate = (loginData) => (dispatch) => {
  dispatch(loginRequest({ loading: true }));
  return postCall(`user/authenticate`, loginData)
    .then(({ data }) => {
      localStorage.setItem("isLogged", true);
      localStorage.setItem("email", data.email);
      localStorage.setItem("userId", data.id);
      localStorage.setItem("firstname", data.firstname);
      dispatch(fetchUserData(data.email));
      dispatch(loginSuccess(data));
    })
    .catch((e) => {
      dispatch(loginFailed(e.response));
    });
};

export const logoutUser = () => (dispatch) => {
  return dispatch(logout());
};
