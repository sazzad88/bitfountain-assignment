import React from "react";
import WelcomeScreen from "./WelcomeScreen";
import { useSelector } from "react-redux";
import { Store } from "../store/types";

function BusinessArea() {
  const user = useSelector((state: Store) => state.user);
  const makingNetworkRequest = useSelector(
    (state: Store) => state.makingNetworkRequest
  );
  return (
    <>
      {user.email === "" ? (
        <WelcomeScreen />
      ) : (
        <p style={{ marginTop: "100px" }}>logged in</p>
      )}
    </>
  );
}

export default BusinessArea;
