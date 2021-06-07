import React, { useState } from "react";
import TextInputElement from "./Utility/TextInputElement";
import Modal from "./Utility/Modal";
import { useDispatch, useSelector } from "react-redux";
import { tryLogin, setNetworkRequest } from "../store/actions";
import { Store } from "../store/types";
import axios from "../base_http_config";

type LoginFormError = {
  email: boolean;
  password: boolean;
};

function Login({ closeModal }: { closeModal: (value: Boolean) => void }) {
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
              email: email.trim(),
              password,
            },
            axios
          )
        );
      }, 500);
    }
  };

  return (
    <Modal height={"250px"} title={"Login"} closeModal={closeModal}>
      <form onSubmit={handleLogin}>
        <TextInputElement
          className={formError.email ? "error" : ""}
          type="text"
          label="Email"
          value={email}
          placeholder="Email"
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
          label="Password"
          value={password}
          placeholder="Password"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
            setFormError({
              email: formError.email,
              password: false,
            });
          }}
        />

        <button type="submit" className="btn btn-full">
          {makingNetworkRequest ? "Trying to login.." : "Login"}
        </button>

        {loginError ? <p className={"authError"}>Wrong credentials. </p> : null}
      </form>
    </Modal>
  );
}

export default Login;
