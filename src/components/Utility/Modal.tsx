import React, { useRef, useEffect, FunctionComponent } from "react";
import "./Modal.css";

type ModalProps = {
  title: string;
  closeModal: (data: Boolean) => void;
};

const Modal: FunctionComponent<ModalProps> = ({
  title,
  closeModal,
  children,
}) => {
  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      modal.current?.classList.add("modal-open");
    }, 100);
  }, []);

  return (
    <>
      <div className="backdrop"></div>
      <div className="modal" ref={modal}>
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
};

export default Modal;
