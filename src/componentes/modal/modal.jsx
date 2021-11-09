import React from 'react';
import ReactDom from 'react-dom';
// import { FaRegTimesCircle, FaRegCheckCircle } from 'react-icons/fa';
import './modal.css';

const portalRoot = document.getElementById('portal-root');

function ModalMsg({
  msg, children, isOpen, onclick, icon,
}) {
  if (!isOpen) {
    return null;
  }

  //   let IconClass = '';
  //   let iconStyle = '';

  //   function Error() {
  //     IconClass = errorIcon;
  //     iconStyle = 'times-circle';
  //   }

  //   function Success() {
  //     IconClass = sucessIcon;
  //     iconStyle = 'check-circle';
  //   }

  //   // eslint-disable-next-line no-unused-expressions
  //   icon === 'error' ? Error() : Success();

  return ReactDom.createPortal(
    <>
      <section className="modal-overlay">
        <img className="iconStyle" src={icon} alt="message" />
        <div className="modal-content">
          <h2>{msg}</h2>
          {children}
          {onclick}
        </div>
      </section>
    </>,
    portalRoot,

  );
}

export default ModalMsg;
