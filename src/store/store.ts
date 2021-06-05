import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { ActionTypes, SET_USER } from "./actions";
import { User, Token, UserState, Store } from "./types";

// Standard interface and functions
const setUser = (id: number, email: string): User => {
  return {
    id,
    email,
  };
};

// Redux implementation
function appReducer(
  state: Store = {
    user: {
      id: 0,
      email: "",
    },
    token: {
      access_token: "",
      expires_in: 0,
    },
    state: {
      loggedIn: false,
    },
  },
  action: ActionTypes
) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}

const store = createStore(appReducer, applyMiddleware(thunk));

export default store;
