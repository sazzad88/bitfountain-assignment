import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

import { AxiosInstance, AxiosResponse } from "axios";
import appData from "../app_config.json";

import { User, LoginInfo, Store, DeviceType, DeviceTypeMap } from "./types";

export const SET_USER = "SET_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const SET_LOGIN_ERROR = "SET_LOGIN_ERROR";
export const SET_NETWORK_REQUEST = "SET_NETWORK_REQUEST";
export const SET_DEVICE_TYPE_MAP = "SET_DEVICE_TYPE_MAP";

export type ActionTypes =
  | { type: typeof SET_USER; payload: User }
  | { type: typeof LOGOUT_USER }
  | { type: typeof SET_NETWORK_REQUEST; payload: Boolean }
  | { type: typeof SET_LOGIN_ERROR; payload: Boolean }
  | { type: typeof SET_DEVICE_TYPE_MAP; payload: DeviceTypeMap };

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

export const setDeviceType = (data: DeviceTypeMap): ActionTypes => ({
  type: SET_DEVICE_TYPE_MAP,
  payload: data,
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
  };

export const fetchDeviceTypes =
  (axios: AxiosInstance): ThunkAction<void, Store, unknown, Action<string>> =>
  async (dispatch) => {
    dispatch(setNetworkRequest(false));

    try {
      let resp: AxiosResponse = await axios.get("devicetype");

      let deviceTypes: Array<DeviceType> = resp.data[0] as Array<DeviceType>,
        givendeviceMap: DeviceTypeMap = {};

      if (deviceTypes) {
        deviceTypes.forEach((item: DeviceType) => {
          givendeviceMap[item.Id] = item.Description;
        });

        dispatch(setDeviceType(givendeviceMap));
      }
    } catch (e) {}
  };
