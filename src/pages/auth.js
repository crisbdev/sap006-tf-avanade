/*eslint-disable*/
import React, { useRef, useCallback, useState } from "react";
import { useHistory } from 'react-router-dom';
import Webcam from "react-webcam";
import "./webcam.css";
import { v4 as uuid } from "uuid";
import storage from "../services/firebaseConfig";
import Modal from '../componentes/modal/modal';
import Button from '../componentes/button/button';
import errorIcon from '../img/error-icon.png';
import sucessfulIcon from '../img/check-icon.png';

const videoConstraints = {
  width: 400,
  heigth: 1200,
  facingMode: "user",
};
const axios = require("axios").default;
let subscriptionKey = "d49f3175dda14a61ac18dd08f5bb95ce";
let endpoint =
  "https://demo-demo-talent.cognitiveservices.azure.com/" + "/face/v1.0/detect";

function WebcamCapture() {

  const webcamRef = useRef(null);

  const [url, setUrl] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const history = useHistory();

  const nextStep = () => {
    history.push('/qr')
  }

  const goBack = () => {
    history.push('/')
  }

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
            setUrl(url)
            axios({
              method: "post",
              url: endpoint,
              params: {
                detectionModel: "detection_03",
                returnFaceId: false,
                returnFaceAttributes: "mask",
              },

              data: {
                url: url,
              },
              headers: { "Ocp-Apim-Subscription-Key": subscriptionKey },
            })
              .then(function (response) {
                const result =
                  response.data[0].faceAttributes.mask.noseAndMouthCovered;
                console.log(result)
                if (result === true) {
                  setConfirmModal(true)
                } else {
                  setErrorModal(true)
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          });
      }
    );
  }, []);
  return (
    <>
      <div className="webcamCapture">
        <Webcam
          className='webcam'
          audio={false}
          ref={webcamRef}
          height={videoConstraints.heigth}
          screenshotFormat="image/jpeg"
          width={videoConstraints.width}
          videoConstraints={videoConstraints}
        />
      </div>
      <Button
        buttonClass="button-webcam"
        onClick={capture}
      ></Button>

      {/* abrir modal de Erro */}
      <Modal
        isOpen={Boolean(errorModal)}
        msg="Você não esta com máscara!"
        icon={errorIcon}
      >
        <Button
          buttonClass="btn-error"
          onClick={goBack}
        >
          Voltar
        </Button>
      </Modal>

      {/* abrir modal de confirmaçao */}
      <Modal
        isOpen={Boolean(confirmModal)}
        msg="Você esta com máscara!"
        icon={sucessfulIcon}
      >
        <Button
          buttonClass="btn-next"
          onClick={nextStep}
        >
          Próximo
        </Button>
      </Modal>

    </>

  );
}
export default WebcamCapture;
