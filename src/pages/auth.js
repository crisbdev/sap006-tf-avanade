/*eslint-disable*/
import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import './webcam.css';
import { v4 as uuid } from 'uuid';
import storage from '../services/firebaseConfig';
import CamLogo from '../assets/camera.png';
import Loading from '../assets/loading.gif';

const videoConstraints = {
  width: 100,
  heigth: 600,
  facingMode: 'user',
};
const axios = require('axios').default;

const subscriptionKey = 'd49f3175dda14a61ac18dd08f5bb95ce';
const endpoint = 'https://demo-demo-talent.cognitiveservices.azure.com/' + '/face/v1.0/detect';

function WebcamCapture() {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [url, setUrl] = useState('');

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    const id = uuid();

    const uploadTask = storage
      .ref(`imagem/${id}`)
      .putString(imageSrc, 'data_url');
    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref('imagem')
          .child(id)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            setLoading(true) 
            axios({
              method: 'post',
              url: endpoint,
              params: {
                detectionModel: 'detection_03',
                returnFaceId: false,
                returnFaceAttributes: 'mask',
              },

              data: {
                url,
              },
              headers: { 'Ocp-Apim-Subscription-Key': subscriptionKey },
            })
              .then((response) => {
                setLoading(false);
                const result = response.data[0].faceAttributes.mask.noseAndMouthCovered;
            
                /// console.log(result)
                if (result === true) {
                  alert('Você esta com mascara');
                } else {
                  alert('Você nao esta com mascara!');
                }
              })
              .catch((error) => {
                console.log(error);
              });
          });

      },
    );
  }, []);
  return (

    <>
      <div className="webcamCapture">
      {loading ? <img src={Loading} alt="Loading"></img> : false}

        <img className="logo-cam" src={CamLogo} />

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
      <div className="text-pic">
        <h3>Face Scan</h3>
        <h4>Escaneie o seu rosto para liberar a validação do certificado de vacina</h4>
      </div>

      <button className="button-webcam" onClick={capture}>Escanear meu rosto</button>

    </>

  );
}
export default WebcamCapture;
