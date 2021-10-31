import React from "react";
import { useHistory } from "react-router";
import DiseaseImg from "../images/disease.jpg";
import BoneFractureImg from "../images/bone_fracture.jpg";
import CovidImg from "../images/covid.jpg";
import PneumoniaImg from "../images/pneumonia.jpg";
import DiabetesImg from "../images/diabetes.jpg";

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
          onClick={() => history.push("/disease-predictor")}
        >
          <div className="service-img-container">
            <img
              src={BoneFractureImg}
              alt="Bone Fracture"
              className="service-img"
            />
            <div className="service-img-overlay"></div>
          </div>
          <div className="service-details-container">
            <h3>Bone Fracture Detector</h3>
            <p>Detect the fracture in your X-Ray</p>
          </div>
        </div>
        {/* End of Service Card */}
        {/* Service Card */}
        <div
          className="service-card"
          onClick={() => history.push("/disease-predictor")}
        >
          <div className="service-img-container">
            <img src={CovidImg} alt="Covid" className="service-img" />
            <div className="service-img-overlay"></div>
          </div>
          <div className="service-details-container">
            <h3>Covid-19 Predictor</h3>
            <p>Predict whether you have Covid-19</p>
          </div>
        </div>
        {/* End of Service Card */}
        {/* Service Card */}
        <div
          className="service-card"
          onClick={() => history.push("/disease-predictor")}
        >
          <div className="service-img-container">
            <img src={PneumoniaImg} alt="Pneumonia" className="service-img" />
            <div className="service-img-overlay"></div>
          </div>
          <div className="service-details-container">
            <h3>Pneumonia Predictor</h3>
            <p>Predict whether you have Pneumonia</p>
          </div>
        </div>
        {/* End of Service Card */}
        {/* Service Card */}
        <div
          className="service-card"
          onClick={() => history.push("/disease-predictor")}
        >
          <div className="service-img-container">
            <img src={DiabetesImg} alt="Diabetes" className="service-img" />
            <div className="service-img-overlay"></div>
          </div>
          <div className="service-details-container">
            <h3>Diabetes Predictor</h3>
            <p>Predict whether you have Diabetes</p>
          </div>
        </div>
        {/* End of Service Card */}
      </div>
    </main>
  );
};

export default LandingPage;
