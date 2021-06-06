import React, { FunctionComponent } from "react";
import "./Modal.css";

type ModalProps = {
  title: string;
  closeModal: (data: Boolean) => void;
};

const Modal: FunctionComponent<ModalProps> = ({
  title,
  closeModal,
  children,
}) => (
  <>
    <div className="backdrop"></div>
    <div className="modal">
      <div className="modal__title">
        {title}
        <span
          className="close"
          onClick={(e) => {
            e.preventDefault();
            closeModal(false);
          }}
        >
          <a href="#">
            <i className="far fa-window-close"></i>
          </a>
        </span>
      </div>
      <div className="modal__content">{children}</div>
    </div>
  </>
);

export default Modal;
