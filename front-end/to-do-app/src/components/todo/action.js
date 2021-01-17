import { createAction } from "@reduxjs/toolkit";
import { getCall, postCall, deleteCall } from "./../util/restCall";

const FETCH_TODO_REQUEST = "FETCH_TODO_REQUEST";
const FETCH_TODO_SUCCESS = "FETCH_TODO_SUCCESS";
const FETCH_TODO_FAILED = "FETCH_TODO_FAILED";

const fetchTodoRequest = createAction(FETCH_TODO_REQUEST);
const fetchTodoSuccess = createAction(FETCH_TODO_SUCCESS);
const fetchTodoFailed = createAction(FETCH_TODO_FAILED);

const FETCH_TODOCATEGORY_REQUEST = "FETCH_TODOCATEGORY_REQUEST";
const FETCH_TODOCATEGORY_SUCCESS = "FETCH_TODOCATEGORY_SUCCESS";
const FETCH_TODOCATEGORY_FAILED = "FETCH_TODOCATEGORY_FAILED";

const fetchTodoCategoryRequest = createAction(FETCH_TODOCATEGORY_REQUEST);
const fetchTodoCategorySuccess = createAction(FETCH_TODOCATEGORY_SUCCESS);
const fetchTodoCategoryFailed = createAction(FETCH_TODOCATEGORY_FAILED);

const ADD_TODOCATEGORY_REQUEST = "ADD_TODOCATEGORY_REQUEST";
const ADD_TODOCATEGORY_SUCCESS = "ADD_TODOCATEGORY_SUCCESS";
const ADD_TODOCATEGORY_FAILED = "ADD_TODOCATEGORY_FAILED";

const addTodoCategoryRequest = createAction(ADD_TODOCATEGORY_REQUEST);
const addTodoCategorySuccess = createAction(ADD_TODOCATEGORY_SUCCESS);
const addTodoCategoryFailed = createAction(ADD_TODOCATEGORY_FAILED);

const ADD_TODO_REQUEST = "ADD_TODO_REQUEST";
const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";
const ADD_TODO_FAILED = "ADD_TODO_FAILED";

const addTodoRequest = createAction(ADD_TODO_REQUEST);
const addTodoSuccess = createAction(ADD_TODO_SUCCESS);
const addTodoFailed = createAction(ADD_TODO_FAILED);

const REMOVE_TODO_REQUEST = "REMOVE_TODO_REQUEST";
const REMOVE_TODO_SUCCESS = "REMOVE_TODO_SUCCESS";
const REMOVE_TODO_FAILED = "REMOVE_TODO_FAILED";

const removeTodoRequest = createAction(REMOVE_TODO_REQUEST);
const removeTodoSuccess = createAction(REMOVE_TODO_SUCCESS);
const removeTodoFailed = createAction(REMOVE_TODO_FAILED);

const UPDATE_TODO_REQUEST = "UPDATE_TODO_REQUEST";
const UPDATE_TODO_SUCCESS = "UPDATE_TODO_SUCCESS";
const UPDATE_TODO_FAILED = "UPDATE_TODO_FAILED";

const updateTodoRequest = createAction(UPDATE_TODO_REQUEST);
const updateTodoSuccess = createAction(UPDATE_TODO_SUCCESS);
const updateTodoFailed = createAction(UPDATE_TODO_FAILED);

const UPDATE_TODO_STATUS_REQUEST = "UPDATE_TODO_STATUS_REQUEST";
const UPDATE_TODO_STATUS_SUCCESS = "UPDATE_TODO_STATUS_SUCCESS";
const UPDATE_TODO_STATUS_FAILED = "UPDATE_TODO_STATUS_FAILED";

const updateTodoStatusRequest = createAction(UPDATE_TODO_STATUS_REQUEST);
const updateTodoStatusSuccess = createAction(UPDATE_TODO_STATUS_SUCCESS);
const updateTodoStatusFailed = createAction(UPDATE_TODO_STATUS_FAILED);

export const fetchTodo = (userId) => (dispatch) => {
  dispatch(fetchTodoRequest({ loading: true }));
  return getCall(`todo/get/${userId}`)
    .then(({ data }) => {
      dispatch(fetchTodoSuccess(data));
    })
    .catch((e) => {
      dispatch(fetchTodoFailed(e.response));
    });
};
export const fetchTodoCategory = (userId) => (dispatch) => {
  dispatch(fetchTodoCategoryRequest({ loading: true }));
  return getCall(`category/get/${userId}`)
    .then(({ data }) => {
      dispatch(fetchTodoCategorySuccess(data));
    })
    .catch((e) => {
      dispatch(fetchTodoCategoryFailed(e.response));
    });
};
export const addTodoCategory = (data, userId) => (dispatch) => {
  dispatch(addTodoCategoryRequest({ loading: true }));
  return postCall(`category/add`, {
    ...data,
    user_id: userId,
  })
    .then(({ data }) => {
      dispatch(addTodoCategorySuccess(data));
    })
    .catch((e) => {
      dispatch(addTodoCategoryFailed(e.response));
    });
};
export const addTodo = (data, userId) => (dispatch) => {
  dispatch(addTodoRequest({ loading: true }));
  return postCall(`todo/add`, {
    ...data,
    user_id: userId,
  })
    .then(({ data }) => {
      dispatch(addTodoSuccess(data));
    })
    .catch((e) => {
      dispatch(addTodoFailed(e.response));
    });
};

export const removeTodo = (todoId, userId) => (dispatch) => {
  dispatch(removeTodoRequest({ loading: true }));
  return deleteCall(`todo/remove/${todoId}/${userId}`)
    .then(({ data }) => {
      dispatch(removeTodoSuccess(todoId));
    })
    .catch((e) => {
      dispatch(removeTodoFailed(e.response));
    });
};

export const updateTodo = (todo, userId) => (dispatch) => {
  dispatch(updateTodoRequest({ loading: true }));
  return postCall(`todo/update`, {
    ...todo,
    user_id: userId,
    todo_id: todo.id,
  })
    .then(({ data }) => {
      dispatch(updateTodoSuccess(data));
    })
    .catch((e) => {
      dispatch(updateTodoFailed(e.response));
    });
};

export const updateTodoStatus = (todoId, userId) => (dispatch) => {
  dispatch(updateTodoStatusRequest({ loading: true }));
  return postCall(`todo/update-status/${todoId}/${userId}`)
    .then(({ data }) => {
      dispatch(updateTodoStatusSuccess(data));
    })
    .catch((e) => {
      dispatch(updateTodoStatusFailed(e.response));
    });
};
