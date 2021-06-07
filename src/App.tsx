import React from "react";
import "./App.css";
import "axios-progress-bar/dist/nprogress.css";
import { Provider, useSelector } from "react-redux";
import Logo from "./components/Logo";
import Menu from "./components/Menu";
import BusinessArea from "./components/BusinessArea";
import { Store } from "./store/types";

import store from "./store/store";

const MenuContainer = () => {
  const user = useSelector((state: Store) => state.user);
  return <>{user.email !== "" ? <Menu /> : null}</>;
};

function App() {
  return (
    <Provider store={store}>
      <header className="app-header">
        <div className="logo-container full-width">
          <Logo />
          <MenuContainer />
        </div>
      </header>
      <BusinessArea />
    </Provider>
  );
}

export default App;
