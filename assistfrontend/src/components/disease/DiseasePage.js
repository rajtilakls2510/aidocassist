import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import Api from "../../services/api";

const DiseasePage = () => {
  const [stage, setStage] = useState(0);
  const [symptomTypes, setSymptomTypes] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [predictedResults, setPredictedResults] = useState({});
  const [lowPrediction, setLowPrediction] = useState(true);
  const selectedSymptomRef = useRef([]);
  useEffect(() => {
    Api.getDiseaseSymptoms()
      .then((res) => {
        setSymptoms(res.data);
        let symptom_types = new Set();
        res.data.reduce(function (acc, currItem) {
          acc.add(currItem.type);
          return acc;
        }, symptom_types);
        symptom_types = Array.from(symptom_types);

        setSymptomTypes(symptom_types);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const handleSymptomClick = (symptom) => {
    const symp = symptoms.find((symp) => symp.symptom === symptom.symptom);

    setSymptoms(symptoms.filter((symptom) => symptom.symptom !== symp.symptom));
    setSelectedSymptoms([...selectedSymptoms, symp]);

    if (stage < 1) setStage(1);
  };

  const handleSelectedSymptomDelete = (symptom) => {
    selectedSymptomRef.current[symptom.symptom].classList.add(
      "remove-selected-item"
    );
    setTimeout(() => {
      const symp = selectedSymptoms.find(
        (symp) => symp.symptom === symptom.symptom
      );
      if (!symptoms.find((symp) => symp.symptom === symptom.symptom))
        setSymptoms([symp, ...symptoms]);
      setSelectedSymptoms(
        selectedSymptoms.filter((symptom) => symptom.symptom !== symp.symptom)
      );
    }, 300);
  };

  const handlePredictClick = () => {
    const symptom_array = {
      symptoms: selectedSymptoms.map((symptom) => symptom.symptom),
    };
    Api.predictDisease(symptom_array)
      .then((res) => {
        setPredictedResults(res.data);
        console.log(res.data);
        setLowPrediction(res.data.probability < 0.6);
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {
        if (stage < 2) setStage(2);
      });
  };

  useEffect(() => {
    if (selectedSymptoms.length === 0 && stage > 0) setStage(0);
    if (selectedSymptoms.length > 0 && stage < 1) setStage(1);
  }, [selectedSymptoms]);

  return (
    <main className="page disease-page">
      <section className="header-section">
        <h3 className="title">Disease Predictor</h3>
        <div className="title-underline"></div>
      </section>
      <section
        className={`symptom-select-section ${
          stage > 0 && "symptom-select-section-show"
        }`}
      >
        <h5>Selected Symptoms: </h5>
        <div className="symptom-predict">
          <div className="selected-symptoms-container">
            {selectedSymptoms.map((symptom) => {
              return (
                <article
                  ref={(el) =>
                    (selectedSymptomRef.current[symptom.symptom] = el)
                  }
                  key={symptom.symptom}
                  className="selected-single-symptom"
                >
                  <div className="selected-single-symptom-container">
                    <p>{symptom.symptom.split("_").join(" ")}</p>
                    <FaTimes
                      onClick={() => handleSelectedSymptomDelete(symptom)}
                    />
                  </div>
                </article>
              );
            })}
          </div>
          <div className="predict-btn-container">
            <button className="btn predict-btn" onClick={handlePredictClick}>
              Predict
            </button>
          </div>
        </div>
      </section>

      <section className="symptom-pred-section">
        <div
          className={`disease-prediction-container ${
            stage > 1 && "disease-prediction-container-show"
          }`}
        >
          <h5 className="disease-pred-title">Prediction Results: </h5>
          <h5>
            <span className="disease-field"> Disease: </span>
            {predictedResults.disease}
          </h5>
          <p>
            <span className="disease-field"> Surety: </span>
            {Math.round(predictedResults.probability * 100)}%
          </p>

          <div
            className={`alert alert-danger pred-alert ${
              !lowPrediction && "pred-alert-hide"
            }`}
            onClick={() => setLowPrediction(false)}
          >
            The surety is too low. Do not trust this prediction! Kindly enter
            more symptoms for better prediction.
          </div>

          <h5 className="disease-field">Precautions: </h5>
          {predictedResults.precautions &&
            (predictedResults.precautions.length === 0 ? (
              <p>No Precautions that we can suggest. Sorry!</p>
            ) : (
              <ul className="precautions-container">
                {predictedResults.precautions.map((precaution) => {
                  return (
                    <li key={precaution} className="single-precaution">
                      {precaution}
                    </li>
                  );
                })}
              </ul>
            ))}
          <h5 className="disease-field">Disease Description: </h5>
          <p className="disease-description">{predictedResults.description}</p>
        </div>

        <div className="symptoms-container">
          <h5 className="symptom-container-title">
            Please Select Your Symptoms:{" "}
          </h5>
          {symptomTypes.map((type) => {
            return (
              <>
                <h5>{type} Symptoms</h5>
                <div className="symptom-type-container">
                  {symptoms
                    .filter((symptom) => {
                      return symptom.type === type;
                    })
                    .map((symptom) => {
                      return (
                        <article
                          key={symptom.symptom}
                          className="single-symptom"
                          onClick={() => handleSymptomClick(symptom)}
                        >
                          <p>{symptom.symptom.split("_").join(" ")}</p>
                        </article>
                      );
                    })}
                </div>
              </>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default DiseasePage;
