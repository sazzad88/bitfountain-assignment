import React from "react";
import "./TextInputElement.css";
function TextInputElement(props) {
  return (
    <input
      {...props}
      className={`input ${props.className ? props.className : ""}`}
    />
  );
}

export default TextInputElement;
