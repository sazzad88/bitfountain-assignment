import React from "react";
import WelcomeScreen from "./WelcomeScreen";
import { useSelector } from "react-redux";
import { Store } from "../store/types";
import DeviceContainer from "./DeviceContainer";

function BusinessArea() {
  const user = useSelector((state: Store) => state.user);

  return <>{user.email === "" ? <WelcomeScreen /> : <DeviceContainer />}</>;
}

export default BusinessArea;
