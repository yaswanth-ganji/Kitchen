import React from "react";
import ReactDOM from "react-dom";
import "../styles/logoutmodel.css";
const LogoutModal = ({ message, isOpen, onClose, onLogOut, btnNo, btnYes }) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="model2">
        <p>{message}</p>
        <div className="btnDiv">
          <button className="close no" onClick={onClose}>
            {btnNo}
          </button>
          <button className="close yes" onClick={onLogOut}>
            {btnYes}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LogoutModal;
