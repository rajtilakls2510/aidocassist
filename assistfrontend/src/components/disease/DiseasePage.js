import React from "react";
import { FaTimes } from "react-icons/fa";
const DiseasePage = () => {
  return (
    <main className="page disease-page">
      <section className="header-section">
        <h2 className="title">Disease Predictor</h2>
        <div className="title-underline"></div>
      </section>
      <section className="symptom-select-section">
        <h5>Selected Symptoms (MAX 20): </h5>
        <div className="symptom-predict">
          <div className="selected-symptoms-container">
            <article className="selected-single-symptom">
              <div className="selected-single-symptom-container">
                <p>itching</p>
                <FaTimes />
              </div>
            </article>
            <article className="selected-single-symptom">
              <div className="selected-single-symptom-container">
                <p>itching</p>
                <FaTimes />
              </div>
            </article>
            <article className="selected-single-symptom">
              <div className="selected-single-symptom-container">
                <p>itching</p>
                <FaTimes />
              </div>
            </article>
            <article className="selected-single-symptom">
              <div className="selected-single-symptom-container">
                <p>itchsdfsing</p>
                <FaTimes />
              </div>
            </article>
            <article className="selected-single-symptom">
              <div className="selected-single-symptom-container">
                <p>itchsdfsdfing</p>
                <FaTimes />
              </div>
            </article>
            <article className="selected-single-symptom">
              <div className="selected-single-symptom-container">
                <p>itching</p>
                <FaTimes />
              </div>
            </article>
            <article className="selected-single-symptom">
              <div className="selected-single-symptom-container">
                <p>itchinsdfsdfg</p>
                <FaTimes />
              </div>
            </article>
            <article className="selected-single-symptom">
              <div className="selected-single-symptom-container">
                <p>itching</p>
                <FaTimes />
              </div>
            </article>
            <article className="selected-single-symptom">
              <div className="selected-single-symptom-container">
                <p>itching</p>
                <FaTimes />
              </div>
            </article>
            <article className="selected-single-symptom">
              <div className="selected-single-symptom-container">
                <p>itching</p>
                <FaTimes />
              </div>
            </article>
          </div>
          <div className="predict-btn-container">
            <button className="btn predict-btn">Predict</button>
          </div>
        </div>
      </section>
      <section className="symptom-pred-section">
        <div className="disease-prediction-container">
          <h5 className="disease-pred-title">Prediction Results: </h5>
          <h5>
            <span className="disease-field"> Disease: </span>Fungal Infection
          </h5>
          <p>
            <span className="disease-field"> Surety: </span>90%
          </p>

          <h5 className="disease-field">Precautions: </h5>
          <ul className="precautions-container">
            <li className="single-precaution">Take Care</li>
            <li className="single-precaution">Take Care</li>
            <li className="single-precaution">Take Care</li>
            <li className="single-precaution">Take Care</li>
          </ul>
          <h5 className="disease-field">Disease Description: </h5>
          <p className="disease-description">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas
            nesciunt neque recusandae culpa! Quia, accusantium?
          </p>
        </div>
        <div className="symptoms-container">
          <h5>Please Select Your Symptoms: </h5>
          <h4>Mild Symptoms</h4>
          <div className="symptom-type-container">
            <article className="single-symptom">
              <p>itching</p>
            </article>
            <article className="single-symptom">
              <p>itchingsdf</p>
            </article>
            <article className="single-symptom">
              <p>itching</p>
            </article>
            <article className="single-symptom">
              <p>itchisdfng</p>
            </article>
            <article className="single-symptom">
              <p>itching</p>
            </article>
            <article className="single-symptom">
              <p>itching</p>
            </article>
            <article className="single-symptom">
              <p>itching</p>
            </article>
            <article className="single-symptom">
              <p>itching</p>
            </article>
          </div>
          <h4>Moderate Symptoms </h4>
          <div className="symptom-type-container">
            <article className="single-symptom">
              <p>itching</p>
            </article>
            <article className="single-symptom">
              <p>itchingsdf</p>
            </article>
            <article className="single-symptom">
              <p>itching</p>
            </article>
            <article className="single-symptom">
              <p>itchisdfng</p>
            </article>
            <article className="single-symptom">
              <p>itching</p>
            </article>
            <article className="single-symptom">
              <p>itching</p>
            </article>
            <article className="single-symptom">
              <p>itching</p>
            </article>
            <article className="single-symptom">
              <p>itching</p>
            </article>
          </div>
          <h4>Severe Symptoms </h4>
          <div className="symptom-type-container">
            <article className="single-symptom">
              <p>itching</p>
            </article>
            <article className="single-symptom">
              <p>itchingsdf</p>
            </article>
            <article className="single-symptom">
              <p>itching</p>
            </article>
            <article className="single-symptom">
              <p>itchisdfng</p>
            </article>
            <article className="single-symptom">
              <p>itching</p>
            </article>
            <article className="single-symptom">
              <p>itching</p>
            </article>
            <article className="single-symptom">
              <p>itching</p>
            </article>
            <article className="single-symptom">
              <p>itching</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DiseasePage;
