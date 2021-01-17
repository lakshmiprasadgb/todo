import { combineReducers } from "redux";
import loggedUser from "./../login/reducer";
import userData from "./userReducer";
import { todo } from "./../todo/reducer";

const initialAppState = {};
const globalData = (state = initialAppState, action) => {
  return state;
};

const rootReducer = combineReducers({
  globalData,
  loggedUser,
  userData,
  todo,
});

export default rootReducer;
