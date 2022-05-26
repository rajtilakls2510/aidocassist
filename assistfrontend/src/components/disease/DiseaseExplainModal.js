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
          {/* ======================== Force Plot for the predicted results ================== */}
          <div className="disease-modal-iframe-container">
            <iframe
              srcDoc={`<html>${predictedResults.force_plot}</html>`}
              frameBorder="0"
              style={{ height: "max-content" }}
              title="Force Plot"
            ></iframe>
            <p>Force Plot: Contribution of Symptoms to the Predicted Disease</p>
            <small>
              How to read the plot? <br /> The features present in Red colour
              are the ones who contributed towards the prediction of the disease
              where as the features in Blue colour contributed against the
              prediction. The amount of contribution towards/against the
              prediction is received from the length of the red or blue arrows.
              The highest contribution features are labelled with their names
              and their presence/absence. For example, "Itching = 1" in Red
              means that the presense of itching contributed towards the
              prediction. Another example, "Joint pain = 0" in Red means that
              the absence of joint pain contributed towards the prediction. For
              actual numbers, refer to the contribution table presented later.
            </small>
          </div>

          {/* ============== Disease, Confidence and Explanation for the predicted results ================== */}
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
              was predicted <b>mainly</b> due to the presence or absence of the
              following symptoms :{" "}
              <small>
                (follow the bottom table for detailed contributions)
              </small>
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

          {/* ======================== Shapley values for the predicted results ================== */}
          <h4 className="disease-pred-title">Contribution of Symptoms:</h4>
          <div className="disease-modal-expl-container">
            <p>
              Contribution of the symptoms towards the prediction of{" "}
              <b>{predictedResults.disease}:</b>{" "}
              <small>(see the above graph for a visual representation)</small>
            </p>
            <small>
              <b>***</b> The contributions were calculated using{" "}
              <a
                className="link"
                href="https://www.analyticsvidhya.com/blog/2019/11/shapley-value-machine-learning-interpretability-game-theory/"
              >
                Shapley Values
              </a>
              . A <b>positive contribution</b> suggests that the symptom
              contributed some percentage towards the <b>higher value</b> of the
              confidence where as <b>negative contribution</b> suggests that the
              symptom contributed towards the <b>lower value</b> of the
              confidence
            </small>
            {predictedResults.shap_values.length > 0 ? (
              <table className="etable">
                <thead>
                  <tr className="etable-row etable-header-row">
                    <th>Symptom</th>
                    <th>Contribution</th>
                    <th>Present/Absent</th>
                  </tr>
                </thead>
                <tbody>
                  {predictedResults.shap_values.map((symptom) => {
                    return symptom.shap !== 0 ? (
                      <tr className="etable-row" key={symptom.symptom}>
                        <td>
                          <p>{symptom.symptom.split("_").join(" ")}</p>
                        </td>
                        <td>
                          <p>{Math.round(symptom.shap * 10000) / 100} %</p>
                        </td>
                        <td>
                          <p>{symptom.present ? "PRESENT" : "ABSENT"}</p>
                        </td>
                      </tr>
                    ) : null;
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
