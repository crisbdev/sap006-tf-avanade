/*eslint-disable*/
/* ewline required at end of file but not found */
import React, { useEffect, useState } from 'react';
import QrScan from 'react-qr-reader';
import './Qrscanner.css';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import dataStore from '../../services/firebaseConfig';
import Footer from '../../componentes/footer/footer.jsx';
import Modal from '../../componentes/modal/modal';
import Button from '../../componentes/button/button';
import Slider from '../../componentes/Slider/Slider'

function QRscanner() {
  /// const ref = dataStore().collection("tokens")
  const ref = firebase.firestore().collection('tokens');
  const refSec = firebase.firestore().collection('tokens-pendentes');
  /// console.log(ref)
  const [token, setToken] = useState([]);


  // function getToken() {
  //   ref.onSnapshot((QuerySnapshot) => {
  //     const items = [];
  //     QuerySnapshot.forEach((doc) => {
  //       items.push(doc.data());

  //     });
  //     setToken(items)
  //   })
  // }
  // useEffect(() => {
  //   getToken();
  // }, []);

  //  // ref.get().then((snap) => {
  //   snap.forEach((post)=> {
  //     if (post.data().status ===("avaliable"){
  //       console.log("wdff")
  //     }else{
  //       console.log("svf")
  //     }
  ///       {token.map((token) => (
  /// / <h1>{token.tittle}</h1>
  /// / ))}
  const routeHistory = useHistory();
  const backToQr = () => {
    routeHistory.push('/');
  };
  const [confirmModal, setConfirmModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [qrscan, setQrscan] = useState('No result');
  const [tutorial, setTutorial] = useState(false);
  
  /// console.log(qrscan);
  const handleScan = (data) => {

    setQrscan(data);

    const dataprint = data;
    /// console.log(dataprint)

    ref.get().then((snap) => {
      snap.forEach((post) => {
        if (post.data().title === dataprint && post.data().status === 'auth') {
          setConfirmModal(true);
        } else if (dataprint === null) {
          // console.log("Sem um qr code para leitura")
        } else if (post.data().status === 'not auth' && post.data().title != dataprint) {
          alert('NAO AUTORIZADO');
        }
      });
    });
    refSec.get().then((snap) => {
      snap.forEach((post) => {
        if (dataprint === null) {
          /// console.log("qr nao lido")
        } else if (post.data().status === 'not auth' && post.data().title === dataprint) {
          setErrorModal(true)
        }
      });
    });
  };

  return (
    <div>
      <div>
        <Modal
          isOpen={Boolean(confirmModal)}
          head="Ops!"
          subtitle="VACINADO"
          msg=""
          modalClass="modal-content"
        >
          <button
            buttonClass="btn-next"
            onClick={backToQr}
          >
            Próximo
          </button>
        </Modal>
        <Modal
          isOpen={Boolean(errorModal)}
          head="Ops!"
          subtitle="NÃO VACINADO"
          msg=""
          modalClass="modal-content"
        >
          <Button
            buttonClass="btn-next"
            onClick={backToQr}
          >
            Próximo
          </Button>
        </Modal>
        <Modal
          isOpen={Boolean(tutorial)}
          head="Ops!"
          subtitle="Tutorial"
          msg=""
          onload={Slider}
          modalClass="modal-content"
        >
          <Button
            buttonClass="btn-next"
            onClick={backToQr}
          >
            Próximo
          </Button>
        </Modal>

        <div className="box">
          <div className="qrscan">
            <QrScan
              className="camera"
              delay={500}
              onScan={handleScan}
            />
          </div>
          <div className="info">
            <h1 className="title">QR Code Scan</h1>
            <p className="subtitle">
              Escaneie seu rosto para liberar a validação do certificado de vacina.
            </p>
            <button type="submit" className="btnQr" onClick={() => setTutorial(true)}>
              Quero obter um certificado
            </button>
              
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default QRscanner;
/*
{tutorial ?
             <div className="modal-overlay">
             <div className='modal-content '>
             <h1>TUTORIAL</h1>
          <h2 className="subtitle-modal"></h2>
          <button onClick={backToQr}>Voltar para o inicio</button>
          <p> </p>
             </div>
           </div>
              : false}
*/
//    {qrscan ? <h1>Li o qr </h1> : false}