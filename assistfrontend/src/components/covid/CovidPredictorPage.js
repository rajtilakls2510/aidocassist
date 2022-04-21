import React, { useState, useEffect, useRef } from "react";
import Api from "../../services/api";
import NoPreviewImg from "../../images/no_preview.jpg";

const CovidPredictorPage = () => {
  // States
  const [stage, setStage] = useState(0);
  // Stage 0: Initial Stage of the page when no file is selected
  // Stage 1: When there is a file selected by the user
  // Stage 2: When there is a prediction result
  const [imgFile, setImgFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [predictions, setPredictions] = useState({
    label: null,
    confidence: null,
  });
  const [notification, setNotification] = useState({
    there: true,
    msg: "Some text",
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

  const handlePredictions = (pred) => {
    setPredictions(
      pred.pred.reduce(
        (acc, current) => {
          if (current.probability > acc.probability) acc = current;
          return acc;
        },
        { label: null, probability: 0 }
      )
    );
  };

  const handlePredictClick = () => {
    if (stage > 0) {
      setLoading(true);
      setNotification({ ...notification, there: false });
      const body = new FormData();
      body.append("img", imgFile);
      Api.predictCovid(body)
        .then((res) => {
          handlePredictions(res.data);
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
        <h3 className="title">Covid-19 Pneumonia Predictor</h3>
        <div className="title-underline"></div>
      </section>
      <section className="covid-description-section">
        <p>Upload your Chest X-Ray to predict what disease you have among:</p>
        <ul className="precautions-container">
          <li className="single-precaution">Normal</li>
          <li className="single-precaution">Covid-19</li>
          <li className="single-precaution">Non-Covid Lung Infection</li>
          <li className="single-precaution">Viral Pneumonia</li>
        </ul>
      </section>
      <section className="covid-upload-section">
        <div className="covid-file-selection-container">
          <h5 className="disease-pred-title">
            Please select your Chest X-Ray file:
          </h5>
          <input type="file" onChange={handleImageSelect} />
        </div>
        <div className="predict-btn-container">
          <button
            className="btn predict-btn"
            onClick={handlePredictClick}
            disabled={loading || stage == 0}
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
              <h5 className="disease-pred-title">Prediction Results: </h5>
              <h5>
                <span className="disease-field"> Disease: </span>
                {predictions.label}
              </h5>
              <p>
                <span className="disease-field"> Confidence: </span>
                {predictions.probability} %
              </p>
            </>
          )}
        </div>
        <div className="covid-preview-container">
          <h5 className="symptom-container-title">Preview X-Ray file</h5>
          <img src={preview || NoPreviewImg} alt="" className="covid-preview" />
        </div>
      </section>
    </main>
  );
};

export default CovidPredictorPage;
