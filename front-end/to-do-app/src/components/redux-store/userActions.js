import { createAction } from "@reduxjs/toolkit";
import { getCall } from "./../util/restCall";

const USER_DATA_FETCH_REQUEST = "USER_DATA_FETCH_REQUEST";
const USER_DATA_FETCH_SUCCESS = "USER_DATA_FETCH_SUCCESS";
const USER_DATA_FETCH_FAIL = "USER_DATA_FETCH_FAIL";

const userDataFetchRequest = createAction(USER_DATA_FETCH_REQUEST);
const userDataFetchSuccess = createAction(USER_DATA_FETCH_SUCCESS);
const userDataFetchFail = createAction(USER_DATA_FETCH_FAIL);

export const fetchUserData = (email) => (dispatch) => {
  dispatch(userDataFetchRequest({ loading: true }));
  return getCall(`user/get/${email}`)
    .then(({ data: userData }) => {
      dispatch(userDataFetchSuccess({ userData }));
    })
    .catch((e) => {
      dispatch(userDataFetchFail(e.response));
    });
};
