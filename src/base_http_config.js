import axios from "axios";
import { loadProgressBar } from "axios-progress-bar";
import app_data from "./app_config.json";
import { tryLogout } from "./store/actions";
import app_redux_store from "./store/store";

const errorHandler = (error) => {
  //console.log({ error });
  //console.log("global error interceptor : ", error);
  if (error.response) {
    if (error.response.status === 403) {
      app_redux_store.dispatch(tryLogout());
    }
  }

  return Promise.reject({ ...error });
};

// Default config options
const defaultOptions = {
  baseURL: app_data.app.base_url,
  headers: {
    "Content-Type": "application/json",
  },
};

// Create instance
let instance = axios.create(defaultOptions);

// Set the AUTH token for any request
instance.interceptors.request.use(function (config) {
  config.headers.Authorization = app_redux_store.getState().user.access_token;

  return config;
});

loadProgressBar(null, instance);

instance.interceptors.response.use(
  (response) => response,
  (error) => errorHandler(error)
);

export default instance;
