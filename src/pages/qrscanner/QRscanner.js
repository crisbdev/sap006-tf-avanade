/* eslint-disable  */
/* ewline required at end of file but not found */
import React, { useState } from 'react';
import QrScan from 'react-qr-reader';
import './Qrscanner.css';
import '../../App.css';
import firebase from 'firebase/compat/app';
import dataStore from '../../services/firebaseConfig';
import Footer from '../../componentes/footer/footer.jsx';
import Button from '../../componentes/button/button.jsx';
// import CamLogo from '../../assets/camera.png';

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

  function openSlider() {
    console.log('Open Slider');
  }

  return (
    <section className="box">
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
        <p className="subtitle">
          Escaneie seu QR Code para validação do certificado de vacina.
        </p>
        <Button type="submit" buttonClass="global-btn" onClick={openSlider}> 
          Ainda não possui certificado?
        </Button>
      </div>
      <Footer />
    </section>
  );
}

export default QRscanner;
