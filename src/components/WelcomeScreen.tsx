import React, { useState } from "react";
import Login from "./Login";

function WelcomeScreen() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div className="welcomeScreen">
      <div className="companyName full-width">
        <div className="name">Bitfountain</div>
        <div className="enter-app">
          <button className="btn" onClick={() => setShowLogin(true)}>
            Enter Application
          </button>
        </div>
      </div>
      {showLogin ? <Login /> : null}
    </div>
  );
}

export default WelcomeScreen;
