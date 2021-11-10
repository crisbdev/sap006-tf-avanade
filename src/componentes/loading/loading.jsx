/* eslint-disable  */
import React from 'react';
import './loading.css';
import Carregando from '../../assets/loading2.gif';

function Loading({ id }) {
  return (
    <>
      <img id={id} className="img-loading" alt="Carregando" src={Carregando}/>
    </>
  );
}

export default Loading;
