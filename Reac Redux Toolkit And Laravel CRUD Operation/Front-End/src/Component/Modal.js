import React, { useState } from "react";

const Modal = ({ title, children, isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <div
      className={`modal ${isVisible ? "modal--open" : ""}`}
      onClick={handleClose}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">{title}</h3>
          <button className="modal__close-btn" onClick={handleClose}>
            &times;
          </button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
