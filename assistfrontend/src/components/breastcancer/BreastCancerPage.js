import React, { useState, useEffect } from "react";
import NoPreviewImg from "../../images/no_preview.jpg";
import Api from "../../services/api";

const BreastCancerPage = () => {
  // States
  const [stage, setStage] = useState(0);
  // Stage 0: Initial Stage of the page when no file is selected
  // Stage 1: When there is a file selected by the user
  // Stage 2: When there is a prediction result
  const [imgFile, setImgFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [notification, setNotification] = useState({
    there: false,
    msg: "",
  });
  const [predictions, setPredictions] = useState({
    benign: null,
    malignant: null,
  });

  useEffect(() => {
    // Handling the stage changes of the page
    if (imgFile == null) {
      setPreview(null);
      setStage(0);
    } else {
      setPreview(URL.createObjectURL(imgFile));
      setStage(1);
    }
    return () => URL.revokeObjectURL(imgFile);
  }, [imgFile]);

  const handleImageSelect = (e) => {
    setImgFile(e.target.files[0]);
  };

  const handlePredictClick = () => {
    if (stage > 0) {
      setLoading(true);
      setNotification({ ...notification, there: false });
      const body = new FormData();
      body.append("img", imgFile);
      Api.segmentCancer(body)
        .then((res) => {
          setPredictions(res.data);
        })
        .catch((err) => {
          if (err.response)
            setNotification({
              there: true,
              msg: `Error Occured with status code: ${err.response.status}`,
            });
          else setNotification({ there: true, msg: err.message });
        })
        .finally(() => {
          if (stage < 2) setStage(2);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page pred-page">
      <section className="header-section">
        <h3 className="title">Breast Cancer Detector</h3>
        <div className="title-underline"></div>
      </section>
      <section className="covid-description-section">
        <p>
          Upload your Breast Ultrasound image and we will segment the cancerous
          portion if present.
        </p>
      </section>
      <section className="covid-upload-section">
        <div className="covid-file-selection-container">
          <h5 className="disease-pred-title">
            Please select your Breast Ultrasound file:
          </h5>
          <input type="file" onChange={handleImageSelect} />
        </div>
        <div className="predict-btn-container">
          <button
            className="btn predict-btn"
            onClick={handlePredictClick}
            disabled={loading || stage === 0}
          >
            Predict
          </button>
          {loading && <div className="loading disease-pred-loading"></div>}
        </div>
      </section>
      <section className="covid-preview-prediction-section">
        <div
          className={`disease-prediction-container ${
            stage > 1 && "disease-prediction-container-show"
          }`}
        >
          {notification.there ? (
            <div className={`alert alert-danger pred-alert `}>
              {notification.msg}
            </div>
          ) : (
            <>
              <h5 className="symptom-container-title">Cancer Segmentation</h5>
              <h5>
                <span className="disease-field"> Benign: </span>
              </h5>
              <img
                src={`data:image/png;base64,${predictions.benign}`}
                alt=""
                className="covid-preview"
              />
              <h5>
                <span className="disease-field"> Malignant: </span>
              </h5>
              <img
                src={`data:image/png;base64,${predictions.malignant}`}
                alt=""
                className="covid-preview"
              />
            </>
          )}
        </div>
        <div className="covid-preview-container">
          <h5 className="symptom-container-title">Preview Ultrasound file</h5>
          <img src={preview || NoPreviewImg} alt="" className="covid-preview" />
        </div>
      </section>
    </main>
  );
};

export default BreastCancerPage;
