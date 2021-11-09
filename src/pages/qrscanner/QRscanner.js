/* eslint-disable  */
/* ewline required at end of file but not found */
import React, { useEffect, useState } from 'react';
import QrScan from 'react-qr-reader';
import './Qrscanner.css';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import dataStore from '../../services/firebaseConfig';

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
        {token.map((token) => (
          <h1>{token.title}</h1>
        ))}
     
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
