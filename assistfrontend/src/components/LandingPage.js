import React from "react";
import { useHistory } from "react-router";
import DiseaseImg from "../images/disease.jpg";
import BoneFractureImg from "../images/bone_fracture.jpg";
import CovidImg from "../images/covid.jpg";
import BreastImg from "../images/breast_cancer.png";

const LandingPage = () => {
  const history = useHistory();

  return (
    <main className="page">
      <div className="services-container">
        {/* Service Card */}
        <div
          className="service-card"
          onClick={() => history.push("/disease-predictor")}
        >
          <div className="service-img-container">
            <img src={DiseaseImg} alt="Disease" className="service-img" />
            <div className="service-img-overlay"></div>
          </div>
          <div className="service-details-container">
            <h3>Disease Predictor</h3>
            <p>Predict your Disease just from a few Symptoms</p>
          </div>
        </div>
        {/* End of Service Card */}
        {/* Service Card */}
        <div
          className="service-card"
          onClick={() => history.push("/covid19-pneumonia-predictor")}
        >
          <div className="service-img-container">
            <img src={CovidImg} alt="Covid" className="service-img" />
            <div className="service-img-overlay"></div>
          </div>
          <div className="service-details-container">
            <h3>Covid-19 Pneumonia Predictor</h3>
            <p>Predict what lung disease you might have</p>
          </div>
        </div>
        {/* End of Service Card */}
        {/* Service Card */}
        <div
          className="service-card"
          onClick={() => history.push("/breast-cancer-detector")}
        >
          <div className="service-img-container">
            <img src={BreastImg} alt="Breast Cancer" className="service-img" />
            <div className="service-img-overlay"></div>
          </div>
          <div className="service-details-container">
            <h3>Breast Cancer Detector</h3>
            <p>Segment the Cancerous part of your Breast Ultrasound Image</p>
          </div>
        </div>
        {/* End of Service Card */}
        {/* Service Card */}
        <div
          className="service-card"
          onClick={() => history.push("/hand-fracture-detector")}
        >
          <div className="service-img-container">
            <img
              src={BoneFractureImg}
              alt="Hand Fracture"
              className="service-img"
            />
            <div className="service-img-overlay"></div>
          </div>
          <div className="service-details-container">
            <h3>Hand Fracture Detector</h3>
            <p>Detect the fracture in your arms' X-Ray</p>
          </div>
        </div>
        {/* End of Service Card */}
      </div>
    </main>
  );
};

export default LandingPage;
