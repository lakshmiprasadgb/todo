import { produce } from "immer";
import { remove as lodashRemove } from "lodash";

const initialState = {
  entities: {
    todoCategory: [],
    todo: [],
  },
  loaders: {},
  error: {},
};

export const todo = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TODO_REQUEST":
      return produce(state, (draftState) => {
        draftState.loaders.todo = true;
      });

    case "FETCH_TODO_SUCCESS":
      return produce(state, (draftState) => {
        draftState.entities.todo = action.payload;
        draftState.loaders.todo = false;
      });

    case "FETCH_TODO_FAILED":
      return produce(state, (draftState) => {
        draftState.error["todo"] = action.payload.data;
        draftState.loaders.todo = false;
      });
    case "FETCH_TODOCATEGORY_REQUEST":
      return produce(state, (draftState) => {
        draftState.loaders.todoCategory = true;
      });

    case "FETCH_TODOCATEGORY_SUCCESS":
      return produce(state, (draftState) => {
        draftState.entities.todoCategory = action.payload;
        draftState.loaders.todoCategory = false;
      });

    case "FETCH_TODOCATEGORY_FAILED":
      return produce(state, (draftState) => {
        draftState.error["todoCategory"] = action.payload.data;
        draftState.loaders.todoCategory = false;
      });
    case "ADD_TODOCATEGORY_REQUEST":
      return produce(state, (draftState) => {
        draftState.loaders.todoCategory = true;
      });

    case "ADD_TODOCATEGORY_SUCCESS":
      return produce(state, (draftState) => {
        draftState.entities.todoCategory.push(action.payload);
        draftState.loaders.todoCategory = false;
      });

    case "ADD_TODOCATEGORY_FAILED":
      return produce(state, (draftState) => {
        draftState.error["todoCategory"] = action.payload.data;
        draftState.loaders.todoCategory = false;
      });
    case "ADD_TODO_REQUEST":
      return produce(state, (draftState) => {
        draftState.loaders.todo = true;
      });

    case "ADD_TODO_SUCCESS":
      return produce(state, (draftState) => {
        draftState.entities.todo.push(action.payload[0]);
        draftState.loaders.todo = false;
      });

    case "ADD_TODO_FAILED":
      return produce(state, (draftState) => {
        draftState.error["todo"] = action.payload.data;
        draftState.loaders.todo = false;
      });
    case "REMOVE_TODO_REQUEST":
      return produce(state, (draftState) => {
        draftState.loaders.todo = true;
      });

    case "REMOVE_TODO_SUCCESS":
      return produce(state, (draftState) => {
        const { todo } = draftState.entities;
        const updateTodo = todo.filter((item) => item.id !== action.payload);
        draftState.entities.todo = updateTodo;
        draftState.loaders.todo = false;
      });

    case "REMOVE_TODO_FAILED":
      return produce(state, (draftState) => {
        draftState.error["todo"] = action.payload.data;
        draftState.loaders.todo = false;
      });
    case "UPDATE_TODO_REQUEST":
      return produce(state, (draftState) => {
        draftState.loaders.todo = true;
      });

    case "UPDATE_TODO_SUCCESS":
      return produce(state, (draftState) => {
        const { todo } = draftState.entities;
        const upadteTodoIndex = todo.findIndex(
          (item) => item.id == action.payload[0]["id"]
        );
        todo[upadteTodoIndex] = action.payload[0];
        draftState.entities.todo = todo;
        draftState.loaders.todo = false;
      });

    case "UPDATE_TODO_FAILED":
      return produce(state, (draftState) => {
        draftState.error["todo"] = action.payload.data;
        draftState.loaders.todo = false;
      });
    case "UPDATE_TODO_STATUS_REQUEST":
      return produce(state, (draftState) => {
        draftState.loaders.todo = true;
      });

    case "UPDATE_TODO_STATUS_SUCCESS":
      return produce(state, (draftState) => {
        const { todo } = draftState.entities;
        const upadteTodoIndex = todo.findIndex((item) => {
          return item.id == action.payload.id;
        });
        todo[upadteTodoIndex]["iscompleted"] = action.payload.iscompleted;
        draftState.entities.todo = todo;
        draftState.loaders.todo = false;
      });

    case "UPDATE_TODO_STATUS_FAILED":
      return produce(state, (draftState) => {
        draftState.error["todo"] = action.payload.data;
        draftState.loaders.todo = false;
      });
    default:
      return state;
  }
};
