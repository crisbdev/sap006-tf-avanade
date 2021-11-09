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
    <div>
      <div>
        <QrScan
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ height: 240, width: 320 }}
        />
      </div>
    </div>
  );
}

export default QRscanner;
