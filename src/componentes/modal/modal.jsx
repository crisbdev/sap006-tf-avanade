import React from 'react';
import ReactDom from 'react-dom';
import './modal.css';

const portalRoot = document.getElementById('portal-root');

function ModalMsg({
  msg, children, isOpen, icon, modalClass, subtitle, header,
}) {
  if (!isOpen) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <div className="modal-overlay">
        <div className={modalClass}>
          <img className="iconStyle" src={icon} alt="message" />
          <div className="content-msg">
            <h1 className="header-modal">{header}</h1>
            <h2 className="subtitle-modal">{subtitle}</h2>
            <p className="msg-final">{msg} </p>
            {children}
          </div>
        </div>
      </div>
    </>,
    portalRoot,

  );
}

export default ModalMsg;
