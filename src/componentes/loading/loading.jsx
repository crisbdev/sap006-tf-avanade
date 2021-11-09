/* eslint-disable  */
import React from 'react';
import Carregando from '../../assets/loading.gif';

function Loading({ id }) {
  return (
    <>
      <img id={id} className="img-loading" alt="Carregando" src={Carregando} />
    </>
  );
}

export default Loading;
