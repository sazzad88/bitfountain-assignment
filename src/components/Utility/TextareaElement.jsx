import React from "react";
import "./TextInputElement.css";
function TextareaElement(props) {
  return (
    <textarea
      {...props}
      rows="5"
      className={`input ${props.className ? props.className : ""}`}
    ></textarea>
  );
}

export default TextareaElement;
