/*eslint-disable*/
/* ewline required at end of file but not found */
import React, { useEffect, useState } from 'react'
import QrScan from 'react-qr-reader'
import './Qrscanner.css'
import firebase from 'firebase/compat/app'
import 'firebase/firestore'
import { useHistory } from 'react-router-dom'
import dataStore from '../../services/firebaseConfig'
import Footer from '../../componentes/footer/footer.jsx'
import Modal from '../../componentes/modal/modal'
import Button from '../../componentes/button/button'
import Vacina from '../../assets/vacina.png'


function QRscanner() {
  /// const ref = dataStore().collection("tokens")
  const ref = firebase.firestore().collection('tokens')
  const refSec = firebase.firestore().collection('tokens-pendentes')
  /// console.log(ref)
  const [token, setToken] = useState([])

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
  const routeHistory = useHistory()
  const backToQr = () => {
    routeHistory.push('/')
  }
  const [confirmModal, setConfirmModal] = useState(false)
  const [errorModal, setErrorModal] = useState(false)
  const [qrscan, setQrscan] = useState('No result')
  const [tutorial, setTutorial] = useState(false)

  /// console.log(qrscan);
  const handleScan = data => {
    setQrscan(data)

    const dataprint = data
    /// console.log(dataprint)

    ref.get().then(snap => {
      snap.forEach(post => {
        if (post.data().title === dataprint && post.data().status === 'auth') {
          setConfirmModal(true)
        } else if (dataprint === null) {
          // console.log("Sem um qr code para leitura")
        } else if (
          post.data().status === 'not auth' &&
          post.data().title != dataprint
        ) {
          alert('NAO AUTORIZADO')
        }
      })
    })
    refSec.get().then(snap => {
      snap.forEach(post => {
        if (dataprint === null) {
          /// console.log("qr nao lido")
        } else if (
          post.data().status === 'not auth' &&
          post.data().title === dataprint
        ) {
          setErrorModal(true)
        }
      })
    })
  }

  return (
    <div>
      <div>
        <Modal
          isOpen={Boolean(confirmModal)}
          head="ÓTIMO!"
          subtitle="VACINADO"
          msg=""
          modalClass="modal-content"
        >
          <button buttonClass="btn-next" onClick={backToQr}>
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
          subtitle="Passo a passo para emissão do certificado de vacinação"
          msg={<div className="certificado">
          <p>"1 - Baixe o aplicativo: Acesse a loja de aplicativos do seu smartphone e busque pelo nome “Conecte SUS” e instale no seu aparelho.</p>
          <p>2 - Login: Após instalação, efetue login por meio da sua conta de acesso do Governo Federal.</p>
          <p>3 - Conecte SUS Cidadão: Depois de logado, acesse Carteira de Vacinação Digital.</p>
          <p>4 - Carteira digital: A carteira irá apresentar os registros de doses recebidas, se o processo vacinal estiver concluído, o app irá habilitar a emissão de certificado. Clique em Certificado de Vacinação, para a emissão."</p>
          </div>}
          icon={Vacina}
          modalClass="modal-content"
        >
        </Modal>

        <div className="box">
          <div className="qrscan">
            <QrScan className="camera" delay={500} onScan={handleScan} />
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
  )
}

export default QRscanner
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
