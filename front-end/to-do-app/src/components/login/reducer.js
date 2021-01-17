import { produce } from "immer";

const userLogged = localStorage.getItem("isLogged");
const email = localStorage.getItem("email");
const user_id = localStorage.getItem("userId");
const initialAppState = {
  entities: {
    email: email ? email : null,
    user_id: user_id ? user_id : null,
    redirectTo: null,
  },
  loaders: {},
  isLogged: userLogged ? userLogged : false,
  error: null,
};
const loggedUser = (state = initialAppState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return produce(state, (draftState) => {
        draftState.loaders.loginLoading = true;
      });
    case "LOGIN_SUCCESS":
      return produce(state, (draftState) => {
        draftState.loaders.loginLoading = false;
        draftState.entities["email"] = action.payload.email;
        draftState.entities["user_id"] = action.payload.id;
        draftState.entities["redirectTo"] = "/";
        draftState.isLogged = true;
        draftState.error = null;
      });
    case "LOGIN_FAIL":
      return produce(state, (draftState) => {
        draftState.loaders.loginLoading = false;
        draftState.isLogged = false;
        draftState.error = action.payload.data;
      });
    case "LOGOUT":
      localStorage.clear();
      return produce(state, (draftState) => {
        draftState.isLogged = false;
        draftState.entities["email"] = null;
        draftState.entities["redirectTo"] = null;
        draftState = initialAppState;
      });
    default:
      return state;
  }
};

export default loggedUser;
