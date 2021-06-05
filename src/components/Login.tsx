import React, { useState } from "react";
import TextInputElement from "./Utility/TextInputElement";
import { useDispatch, useSelector } from "react-redux";
import { tryLogin, setNetworkRequest } from "../store/actions";
import { Store } from "../store/types";
import axios from "../base_http_config";

type LoginFormError = {
  email: boolean;
  password: boolean;
};

function Login() {
  const dispatch = useDispatch();
  const loginError = useSelector((state: Store) => state.loginError);
  const makingNetworkRequest = useSelector(
    (state: Store) => state.makingNetworkRequest
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<LoginFormError>({
    email: false,
    password: false,
  });

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();

    let allOk = true;
    if (email === "") {
      setFormError((value) => {
        return {
          email: true,
          password: value.password,
        };
      });

      allOk = false;
    }

    if (password === "") {
      setFormError((value) => {
        return {
          email: value.email,
          password: true,
        };
      });
      allOk = false;
    }

    if (allOk) {
      dispatch(setNetworkRequest(true));

      setTimeout(() => {
        dispatch(
          tryLogin(
            {
              email,
              password,
            },
            axios
          )
        );
      }, 500);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <TextInputElement
          className={formError.email ? "error" : ""}
          type="text"
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
            setFormError({
              email: false,
              password: formError.password,
            });
          }}
        />
        <TextInputElement
          className={formError.password ? "error" : ""}
          type="password"
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
            setFormError({
              email: formError.email,
              password: false,
            });
          }}
        />

        <button type="submit" className="btn btn-full">
          Login {makingNetworkRequest ? "making.." : ""}
        </button>

        {loginError ? <p>login error happen</p> : null}
      </form>
    </div>
  );
}

export default Login;
