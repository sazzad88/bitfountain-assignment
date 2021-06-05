import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import axios from "axios";

import { User, LoginInfo, Store } from "./types";

export const SET_USER = "SET_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const SET_LOGIN_ERROR = "SET_LOGIN_ERROR";
export const SET_NETWORK_REQUEST = "SET_NETWORK_REQUEST";

export type ActionTypes =
  | { type: typeof SET_USER; payload: User }
  | { type: typeof LOGOUT_USER }
  | { type: typeof SET_NETWORK_REQUEST; payload: Boolean }
  | { type: typeof SET_LOGIN_ERROR; payload: Boolean };

export const setUser = (user: User): ActionTypes => ({
  type: SET_USER,
  payload: user,
});

export const setLoginError = (value: Boolean): ActionTypes => ({
  type: SET_LOGIN_ERROR,
  payload: value,
});

export const setNetworkRequest = (value: Boolean): ActionTypes => ({
  type: SET_NETWORK_REQUEST,
  payload: value,
});

export const tryLogin =
  (data: LoginInfo): ThunkAction<void, Store, unknown, Action<string>> =>
  async (dispatch) => {
    dispatch(setNetworkRequest(false));

    try {
      let resp = await axios.post(
        "http://163.47.115.230:30000/api/login",
        data
      );
      //const todos: Todo[] = await resp.json();
      // console.log(resp.data);
      dispatch(
        setUser({
          id: resp.data.user.id,
          email: resp.data.user.email,
          access_token: resp.data.access_token,
          expires_in: 50,
        })
      );
    } catch (e) {
      console.log(e);
      dispatch(setLoginError(true));
      setTimeout(() => {
        dispatch(setLoginError(false));
      }, 3000);
    }

    //dispatch(setTodos(todos));
  };
