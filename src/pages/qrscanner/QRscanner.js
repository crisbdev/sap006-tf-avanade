import React, { useState } from 'react';
import QrScan from 'react-qr-reader';
import './index.css';

function QRscanner() {
  const [qrscan, setQrscan] = useState('No result');
  console.log(qrscan);
  const handleScan = (data) => {
    console.log(data);
    if (data) {
      setQrscan(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
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
