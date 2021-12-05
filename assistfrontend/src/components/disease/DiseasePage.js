import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import Api from "../../services/api";
import DiseaseExplainModal from "./DiseaseExplainModal";

const DiseasePage = () => {
  const [stage, setStage] = useState(0);
  const [symptomTypes, setSymptomTypes] = useState([]);
  const [allSymptoms, setallSymptoms] = useState([]);
  const [contextSymptoms, setContextSymptoms] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [predictedResults, setPredictedResults] = useState({
    disease: "",
    probability: "",
    precautions: [],
    force_plot: "",
    shap_values: [],
  });
  const [lowPrediction, setLowPrediction] = useState(true);
  const selectedSymptomRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const [reasonModalOpen, setReasonModalOpen] = useState(false);
  useEffect(() => {
    Api.getDiseaseSymptoms()
      .then((res) => {
        setallSymptoms(res.data);
        setContextSymptoms(res.data);
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
  const searchSymptoms = () => {
    if (searchText.length === 0) {
      let symptomsToBeAdded = [];
      allSymptoms.forEach((symptom) => {
        if (!selectedSymptoms.includes(symptom))
          symptomsToBeAdded.push(symptom);
      });
      setContextSymptoms(symptomsToBeAdded);
    } else if (searchText.length > 0 && searchText.length < 3) {
      setContextSymptoms([]);
    } else {
      // Step1: Tokenize the search string such that each token is more than 2 characters
      const searchTokens = searchText
        .split(/\W+/)
        .filter((token) => token.length > 2);
      // Step2: For every token find the matching symptoms and add them to
      //        contextSymptoms if this symptom is not present in either contextSymptoms or selectedSymptoms
      if (searchTokens.length > 0) {
        let matchedSymptoms = [];
        searchTokens.forEach((currentToken) => {
          const filteredSymptomsToken = allSymptoms.filter((symptom) =>
            symptom.symptom.includes(currentToken.toLowerCase())
          );
          filteredSymptomsToken.forEach((symptom) => {
            if (!matchedSymptoms.includes(symptom))
              matchedSymptoms.push(symptom);
          });
        });
        let symptomsToBeAdded = [];
        matchedSymptoms.forEach((symptom) => {
          if (
            !symptomsToBeAdded.includes(symptom) &&
            !selectedSymptoms.includes(symptom)
          )
            symptomsToBeAdded.push(symptom);
        });
        setContextSymptoms(symptomsToBeAdded);
      }
    }
  };

  const handleSymptomClick = (symptom) => {
    const symp = contextSymptoms.find(
      (symp) => symp.symptom === symptom.symptom
    );

    setContextSymptoms(
      contextSymptoms.filter((symptom) => symptom.symptom !== symp.symptom)
    );
    setSelectedSymptoms([...selectedSymptoms, symp]);

    if (stage < 1) setStage(1);
  };

  const handleSelectedSymptomDelete = (symptom) => {
    selectedSymptomRef.current[symptom.symptom].classList.add(
      "remove-selected-item"
    );
    // Setting timeout so that the remove animation can finish within 300ms
    setTimeout(() => {
      const symp = selectedSymptoms.find(
        (symp) => symp.symptom === symptom.symptom
      );
      // if (!contextSymptoms.find((symp) => symp.symptom === symptom.symptom))
      //   setContextSymptoms([symp, ...contextSymptoms]);
      setSelectedSymptoms(
        selectedSymptoms.filter((symptom) => symptom.symptom !== symp.symptom)
      );
    }, 300);
  };

  const handlePredictClick = () => {
    const symptom_array = {
      symptoms: selectedSymptoms.map((symptom) => symptom.symptom),
    };
    setLoading(true);
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
        setLoading(false);
      });
  };

  // Search UseEffect
  useEffect(() => {
    searchSymptoms();
  }, [searchText, selectedSymptoms]);

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
      {/* ============================= Symptom Selection Section =======================  */}
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
            <button
              className="btn predict-btn"
              onClick={handlePredictClick}
              disabled={loading}
            >
              Predict
            </button>
            {loading && <div className="loading disease-pred-loading"></div>}
          </div>
        </div>
      </section>

      {/* ============================= Prediction Section =======================  */}
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
            <span className="disease-field"> Confidence: </span>
            {Math.round(predictedResults.probability * 100)}%
          </p>

          <div
            className={`alert alert-danger pred-alert ${
              !lowPrediction && "pred-alert-hide"
            }`}
            onClick={() => setLowPrediction(false)}
          >
            The confidence is too low. Do not trust this prediction! Kindly
            enter more symptoms for better prediction.
          </div>

          <div className="disease-reason-header">
            <h5 className="disease-field">Brief Reason: </h5>
            <button
              className="btn btn-hipster"
              onClick={() => setReasonModalOpen(true)}
            >
              View Explanation
            </button>
          </div>
          {predictedResults.shap_values &&
            (predictedResults.shap_values.length === 0 ? (
              <p>No Explanation found. Sorry!</p>
            ) : (
              <ul className="precautions-container">
                {predictedResults.shap_values
                  .filter(
                    (symptom) =>
                      symptom.shap > predictedResults.contribution_threshold &&
                      symptom.present === true
                  )
                  .map((symptom) => {
                    return (
                      <li key={symptom.symptom} className="single-precaution">
                        Presence of {symptom.symptom.split("_").join(" ")}
                      </li>
                    );
                  })}
              </ul>
            ))}

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

        {/* ============================= All Symptoms Container =======================  */}

        <div className="symptoms-container">
          <h5 className="symptom-container-title">
            Please Select Your Symptoms:{" "}
          </h5>
          <input
            type="text"
            className="symptom-search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search Symptoms"
          />
          {symptomTypes.map((type) => {
            return (
              <>
                <h5>{type} Symptoms</h5>
                <div className="symptom-type-container">
                  {contextSymptoms
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
      <DiseaseExplainModal
        show={reasonModalOpen}
        predictedResults={predictedResults}
        onClose={() => setReasonModalOpen(false)}
      />
    </main>
  );
};

export default DiseasePage;
