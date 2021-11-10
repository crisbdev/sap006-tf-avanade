/* eslint-disable  */
/* ewline required at end of file but not found */
import React, { useEffect, useState } from 'react';
import QrScan from 'react-qr-reader';
import './Qrscanner.css';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import dataStore from '../../services/firebaseConfig';
import Footer from '../../componentes/footer/footer.jsx';
import Modal from '../../componentes/modal/modal';

function QRscanner() {
 /// const ref = dataStore().collection("tokens")
 const ref = firebase.firestore().collection("tokens")
  ///console.log(ref)
  const [token, setToken] = useState([])

  function getToken() {
    ref.onSnapshot((QuerySnapshot) => {
      const items = [];
      QuerySnapshot.forEach((doc) => {
        items.push(doc.data());

      }); 
      setToken(items)
    })
  }
  useEffect(() => {
    getToken();
  }, []);


//  // ref.get().then((snap) => {
//   snap.forEach((post)=> {
//     if (post.data().status ===("avaliable"){
//       console.log("wdff")
//     }else{
//       console.log("svf")
//     }
///       {token.map((token) => (
 //// <h1>{token.tittle}</h1>
 //// ))}

  const [confirmModal, setConfirmModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [qrscan, setQrscan] = useState('No result');

  ///console.log(qrscan);
  const handleScan = (data) => {
    
    setQrscan(data);

   const dataprint = data; 
   console.log(dataprint)
   ref.get().then((snap) => {
    snap.forEach((post) => {
      if (post.data().status === dataprint){
      alert("VACINADO")
      } else {
    
      }
    })
  })

  };

  const handleError = (err) => {
    console.error(err);
  };
  
  return (
    <div>
          {qrscan ? <h1>Li o qr (dado)</h1> : false}
      <div>
     
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
      <Footer />
    </div>
      </div>
    </div>
  );
}

export default QRscanner;