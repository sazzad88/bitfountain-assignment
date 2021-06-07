import React from "react";
import "./TextInputElement.css";
function TextInputElement(props) {
  return (
    <>
      {props.label ? <div className="input-label">{props.label}</div> : null}
      <input
        {...props}
        className={`input ${props.className ? props.className : ""}`}
      />
    </>
  );
}

export default TextInputElement;
