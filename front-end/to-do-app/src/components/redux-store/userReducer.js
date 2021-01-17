import { produce } from "immer";

const userId = localStorage.getItem("userId");
const firstname = localStorage.getItem("firstname");
const initialAppState = {
  entities: {
    userDetails: {
      id: userId,
      firstname: firstname,
    },
  },
  loaders: {},
  error: {},
};
const userData = (state = initialAppState, action) => {
  switch (action.type) {
    case "USER_DATA_FETCH_REQUEST":
      return produce(state, (draftState) => {
        draftState.loaders.userDataFetch = true;
      });
    case "USER_DATA_FETCH_SUCCESS":
      return produce(state, (draftState) => {
        draftState.loaders.userDataFetch = false;
        draftState.entities.userDetails = action.payload.userData;
      });
    case "USER_DATA_FETCH_FAIL":
      return produce(state, (draftState) => {
        draftState.loaders.userDataFetch = false;
        draftState.isLogged = false;
        draftState.error = action.payload.data;
      });
    default:
      return state;
  }
};

export default userData;
