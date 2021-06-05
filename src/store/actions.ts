import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

import { User, Token } from "./types";

export const SET_USER = "SET_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const SET_TOKEN = "SET_TOKEN";
export const REMOVE_TOKEN = "REMOVE_TOKEN";

export type ActionTypes =
  | { type: typeof SET_USER; payload: User }
  | { type: typeof LOGOUT_USER }
  | { type: typeof REMOVE_TOKEN };

export const setUser = (user: User): ActionTypes => ({
  type: SET_USER,
  payload: user,
});
