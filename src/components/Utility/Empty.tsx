import React, { FunctionComponent } from "react";

type ModalProps = {
  message: string;
};

const Empty: FunctionComponent<ModalProps> = ({ message, children }) => {
  return (
    <div className="notification-container">
      <p style={{ textAlign: "center", marginBottom: "15px" }}>
        <i style={{ fontSize: "30px" }} className="fas fa-box-open"></i>
      </p>
      <p style={{ textAlign: "center" }}>{message}</p>
    </div>
  );
};

export default Empty;
