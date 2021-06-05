import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import {
  ActionTypes,
  SET_USER,
  SET_LOGIN_ERROR,
  SET_NETWORK_REQUEST,
} from "./actions";
import { User, Store } from "./types";

// Standard interface and functions

const localStorage_key = "bf_appData";

let baseStore: Store = {
    user: {
      id: 0,
      email: "",
      access_token: "",
      expires_in: 0,
    },
    loginError: false,
    makingNetworkRequest: false,
  },
  savedUser: User;

try {
  savedUser = JSON.parse(localStorage.getItem(localStorage_key) as string);
  baseStore.user = savedUser;
} catch (e) {}

// Redux implementation
function appReducer(state: Store = baseStore, action: ActionTypes) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload as User,
      };
    case SET_LOGIN_ERROR:
      return {
        ...state,
        loginError: action.payload,
      };
    case SET_NETWORK_REQUEST:
      return {
        ...state,
        makingNetworkRequest: action.payload,
      };
    default:
      return state;
  }
}

const store = createStore(appReducer, applyMiddleware(thunk));

store.subscribe(() => {
  localStorage.setItem(localStorage_key, JSON.stringify(store.getState().user));
});

export default store;
