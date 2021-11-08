/*eslint-disable*/
import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import "./webcam.css";
import { v4 as uuid } from "uuid";
import storage from "../services/firebaseConfig";

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
                ///console.log(result)
                if (result === true) {
                  alert("Você esta com mascara")
                } else {
                  alert("Você nao esta com mascara");
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
      <button className="button-webcam" onClick={capture}></button>
    </>
    
  );
}
export default WebcamCapture;
