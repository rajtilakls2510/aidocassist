import React from "react";
import Modal from "../Modal";
import { FaTimes } from "react-icons/fa";

export default function DiseaseExplainModal({
  show,
  onClose,
  predictedResults,
}) {
  const handleClose = () => {
    if (onClose) onClose();
  };
  return (
    <Modal show={show}>
      <article className="modal-card disease-modal-card">
        <h3>Prediction and Explanation</h3>
        <div className="disease-explanation-content">
          <div className="disease-modal-iframe-container">
            <iframe
              srcDoc={`<html>${predictedResults.force_plot}</html>`}
              frameBorder="0"
              style={{ height: "max-content" }}
              title="Force Plot"
            ></iframe>
            <p>Force Plot: Contribution of Symptoms to the Predicted Disease</p>
          </div>

          <h4 className="disease-pred-title">Prediction:</h4>
          <div className="disease-modal-pred-container">
            <h5>
              <span className="disease-field"> Disease: </span>
              {predictedResults.disease}
            </h5>
            <p>
              <span className="disease-field"> Confidence: </span>
              {Math.round(predictedResults.probability * 100)}%
            </p>
          </div>
          <h4 className="disease-pred-title">Explanation:</h4>
          <div className="disease-modal-expl-container">
            <p>
              The predicted disease is {predictedResults.disease} with{" "}
              {Math.round(predictedResults.probability * 100)}% confidence. It
              was predicted due to the presence or absence of the following
              symptoms:
            </p>
            {predictedResults.shap_values &&
              (predictedResults.shap_values.length === 0 ? (
                <p>No symptoms had enough contribution</p>
              ) : (
                <ul className="precautions-container">
                  {predictedResults.shap_values
                    .filter(
                      (symptom) =>
                        symptom.shap > predictedResults.contribution_threshold
                    )
                    .map((symptom) => {
                      return (
                        <li key={symptom.symptom} className="single-precaution">
                          {symptom.present ? "Presence" : "Absence"} of{" "}
                          {symptom.symptom.split("_").join(" ")}
                        </li>
                      );
                    })}
                </ul>
              ))}
          </div>
          <h4 className="disease-pred-title">Shapley Values for Symptoms:</h4>
          <div className="disease-modal-expl-container">
            <p>
              <b>Shapley values</b> are used to measure the <b>contribution</b>{" "}
              of each feature to the prediction of a Machine Learning model. The
              more <b>positive</b> is the shapley value for a feature, the more
              it contributed towards the <b>positivity</b> of the prediction.
              The more <b>negative</b> is the shapley value for a feature, the
              more it contributed towards the <b>negativity</b> of the
              prediction. Refer to the above graph for Graphical Representation.
              Given below are the shapley values for each of the symptoms:
            </p>
            {predictedResults.shap_values.length > 0 ? (
              <table className="etable">
                <thead>
                  <tr className="etable-row etable-header-row">
                    <th>Symptom</th>
                    <th>Shapley Value</th>
                    <th>Present/Absent</th>
                  </tr>
                </thead>
                <tbody>
                  {predictedResults.shap_values.map((symptom) => {
                    return (
                      <tr className="etable-row" key={symptom.symptom}>
                        <td>
                          <p>{symptom.symptom.split("_").join(" ")}</p>
                        </td>
                        <td>
                          <p>{symptom.shap}</p>
                        </td>
                        <td>
                          <p>{symptom.present ? "PRESENT" : "ABSENT"}</p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p>Sorry! No shapley values found</p>
            )}
          </div>
        </div>
        <button className="modal-close-btn" onClick={handleClose}>
          <FaTimes />
        </button>
      </article>
    </Modal>
  );
}
