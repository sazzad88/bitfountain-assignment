import React, { useRef, useEffect, FunctionComponent } from "react";
import "./Modal.css";

type ModalProps = {
  title: string;
  closeModal: (data: Boolean) => void;
  height?: string;
};

const Modal: FunctionComponent<ModalProps> = ({
  title,
  closeModal,
  height,
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
              modal.current?.classList.remove("modal-open");
              setTimeout(() => {
                closeModal(false);
              }, 100);
            }}
          >
            <i className="far fa-window-close"></i>
          </span>
        </div>
        <div className="modal__content" style={{ height: height ?? "600px" }}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
