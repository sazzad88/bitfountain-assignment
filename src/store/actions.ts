import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

import { AxiosInstance } from "axios";
import appData from "../app_config.json";

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
  (
    data: LoginInfo,
    axios: AxiosInstance
  ): ThunkAction<void, Store, unknown, Action<string>> =>
  async (dispatch) => {
    dispatch(setNetworkRequest(false));

    try {
      let resp = await axios.post("login", data);
      //const todos: Todo[] = await resp.json();
      // console.log(resp.data);

      const user: User = {
        id: resp.data.user.id,
        email: resp.data.user.email,
        access_token: resp.data.access_token,
        expires_in: 50,
      };

      localStorage.setItem(appData.app.data_storage_key, JSON.stringify(user));

      dispatch(setUser(user));
    } catch (e) {
      dispatch(setLoginError(true));
      setTimeout(() => {
        dispatch(setLoginError(false));
      }, 3000);
    }

    //dispatch(setTodos(todos));
  };
