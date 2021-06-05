import axios from "axios";
import { loadProgressBar } from "axios-progress-bar";
import app_data from "./app_config.json";
import app_redux_store from "./store/store";

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

export default instance;
