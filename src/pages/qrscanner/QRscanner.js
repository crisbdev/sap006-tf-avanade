/* eslint-disable  */
/* ewline required at end of file but not found */
import React, { useState } from 'react';
import QrScan from 'react-qr-reader';
import './Qrscanner.css';
import firebase from 'firebase/compat/app';
import dataStore from '../../services/firebaseConfig';

function QRscanner() {
  const [qrscan, setQrscan] = useState('No result');
  ///console.log(qrscan);
  const handleScan = (data) => {
    setQrscan(data);
    console.log(data);

    if (data) {
      setQrscan(data);  
    }
  };
  const handleError = (err) => {
    ////console.error(err);
  };
  
  const addPost = (texto) => {
    dataStore().collection('posts').add({
      text: texto,
    });
  };

  return (
    <div className="box">
      <div className="qrscan">
        <QrScan
          className="camera"
          delay={900}
          onError={handleError}
          onScan={handleScan}
        />
      </div>
      <div className="info">
        <h1 className="title">QR Code Scan</h1>
        <span className="subtitle">
          Escaneie seu rosto para liberar a validação do certificado de vacina.
        </span>
        <button type="submit" className="btnQr">
          Escanear QR Code
        </button>
      </div>
    </div>
  );
}

export default QRscanner;
