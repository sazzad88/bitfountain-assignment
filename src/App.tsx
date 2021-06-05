import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import Logo from "./components/Logo";
import BusinessArea from "./components/BusinessArea";

import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <header className="app-header">
        <div className="logo-container full-width">
          <Logo />
          <div className="menu-items">{/* <a href="#">Login</a> */}</div>
        </div>
      </header>
      <BusinessArea />
    </Provider>
  );
}

export default App;
