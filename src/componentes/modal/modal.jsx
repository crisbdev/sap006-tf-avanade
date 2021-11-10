/* eslint-disable  */
import React from 'react';
import ReactDom from 'react-dom';
// import { FaRegTimesCircle, FaRegCheckCircle } from 'react-icons/fa';
import './modal.css';

const portalRoot = document.getElementById('portal-root');

function ModalMsg({
  msg, children, isOpen, onclick, icon, modalClass, subtitle, header,
}) {
  if (!isOpen) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <div className="modal-overlay">
      
        <div className={modalClass}>
          <img className="iconStyle" src={icon} alt="message" />
          <h1>{header}</h1>
          <h2 className="subtitle-modal">{subtitle}</h2>
          <p>{msg} </p>
          {children}
        </div>
      </div>
    </>,
    portalRoot,

  );
}

export default ModalMsg;
