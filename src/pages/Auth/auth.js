/*eslint-disable*/
import React, { useRef, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import Webcam from "react-webcam";
import "./webcam.css";
import "../../App.css";
import "../qrscanner/Qrscanner.css";
import { v4 as uuid } from "uuid";
import storage from "../../services/firebaseConfig";
import Modal from "../../componentes/modal/modal";
import Button from "../../componentes/button/button";
import errorIcon from "../../assets/error-icon.png";
import sucessfulIcon from "../../assets/check-icon.png";
// import CamLogo from '../../assets/camera.png';
import Footer from "../../componentes/footer/footer.jsx";
import Loading from "../../componentes/loading/loading.jsx";

const videoConstraints = {
  width: 100,
  heigth: 600,
  facingMode: "user",
};
const axios = require("axios").default;

const subscriptionKey = "d49f3175dda14a61ac18dd08f5bb95ce";
const endpoint =
  "https://demo-demo-talent.cognitiveservices.azure.com/" + "/face/v1.0/detect";

function WebcamCapture() {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [url, setUrl] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const history = useHistory();

  const nextStep = () => {
    if (confirmModal == true){
      history.push('/qr')
    }
  };

  const goBack = () => {
    window.location.reload()
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    const id = uuid();

    const uploadTask = storage
      .ref(`imagem/${id}`)
      .putString(imageSrc, "data_url");
    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("imagem")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            setLoading(true);
            axios({
              method: "post",
              url: endpoint,
              params: {
                detectionModel: "detection_03",
                returnFaceId: false,
                returnFaceAttributes: "mask",
              },

              data: {
                url,
              },
              headers: { "Ocp-Apim-Subscription-Key": subscriptionKey },
            })
              .then(function (response) {
                const result =
                  response.data[0].faceAttributes.mask.noseAndMouthCovered;
                console.log(result);
                if (result === true) {
                  setConfirmModal(true)
                  
                } else {
                  setErrorModal(true);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          });
      }
    );
  }, []);
  return (
    <section className="box-cam">
      <div className="webcamCapture">
        <Webcam
          className="webcam"
          audio={false}
          ref={webcamRef}
          height={videoConstraints.heigth}
          screenshotFormat="image/jpeg"
          width={videoConstraints.width}
          videoConstraints={videoConstraints}
        />
      </div>
      <div className="info">
        <h1 className="title">Face Scan</h1>
        <p className="subtitle">
          Escaneie seu rosto para liberar a validação do certificado de vacina.
        </p>

        {loading ? (
          <Loading />
        ) : (
          <Button type="submit" buttonClass="global-btn" onClick={capture}>
            Escanear meu Rosto
          </Button>
        )}
      </div>
      <Footer />

      {/* abrir modal de Erro */}
      <Modal
     isOpen={Boolean(errorModal) }
     header="OPS!"
     msg="Verifique se a máscara cobre toda a área do nariz e da boca."
     modalClass="modal-content"
     icon={errorIcon}
      >

        <Button
          buttonClass="btn-error"
          onClick={goBack}
        >
          VOLTAR
        </Button>

      </Modal>

      {/* abrir modal de confirmaçao */}
      <Modal
        isOpen={Boolean(confirmModal)}
        header="ÓTIMO!"
        msg="Escaneamento realizado com sucesso!"
        modalClass="modal-content"
        icon={sucessfulIcon}
    

      >
        <Button
          buttonClass="btn-next"
          onClick={nextStep}
        >
          PRÓXIMO
        </Button>

      </Modal>
    </section>
  );
}
export default WebcamCapture;
