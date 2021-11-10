/* eslint-disable */
/* eslint-disable react/prop-types */
import React from 'react';

function Button({
  onClick,
  buttonClass,
  children,

}) {
  return (

    <button onClick={onClick} className={buttonClass}>{children}</button>
  );
}

export default Button;
