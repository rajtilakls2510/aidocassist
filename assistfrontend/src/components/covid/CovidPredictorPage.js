import React, { useState, useEffect } from "react";
import Api from "../../services/api";
import NoPreviewImg from "../../images/no_preview.jpg";
import CovidWorksImg from "../../images/covid_works.png";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const CovidPredictorPage = () => {
  // States
  const [stage, setStage] = useState(0);
  // Stage 0: Initial Stage of the page when no file is selected
  // Stage 1: When there is a file selected by the user
  // Stage 2: When there is a prediction result
  const [imgFile, setImgFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [notification, setNotification] = useState({
    there: false,
    msg: "",
  });
  const [chartData, setChartData] = useState(null);

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

  const getMaxPredictions = () => {
    return predictions.reduce(
      (acc, current) => {
        if (current.probability > acc.probability) acc = current;
        return acc;
      },
      { label: null, probability: 0 }
    );
  };
  const handlePredictions = (pred) => {
    setPredictions(pred);
    // Calculating data for chart
    let data = {
      // Name of the variables on x-axies for each bar
      labels: pred.map((pre) => pre.label),
      datasets: [
        {
          // Label for bars
          label: "Confidence (%)",
          // Data or value of your each variable
          data: pred.map((pre) => Math.round(pre.probability * 10000) / 100),
          // Color of each bar
          backgroundColor: pred.map((pre) => "#ffc857"),
          // Border color of each bar
          borderColor: pred.map((pre) => "#665023"),
          borderWidth: 1,
        },
      ],
    };
    setChartData(data);
  };

  const handlePredictClick = () => {
    if (stage > 0) {
      setLoading(true);
      setNotification({ ...notification, there: false });
      const body = new FormData();
      body.append("img", imgFile);
      Api.predictCovid(body)
        .then((res) => {
          handlePredictions(res.data.pred);
        })
        .catch((err) => {
          if (err.response)
            setNotification({
              there: true,
              msg: `Error Occured with status code: ${err.response.status}`,
            });
          else setNotification({ there: true, msg: err.message });
          setChartData(null);
          setPredictions([]);
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
        <div className="covid-description-container">
          <p>
            Upload your Chest X-Ray to predict what Lung disease you might have
            among:
          </p>
          <ul className="precautions-container">
            <li className="single-precaution">Normal</li>
            <li className="single-precaution">Covid-19</li>
            <li className="single-precaution">Non-Covid Lung Infection</li>
            <li className="single-precaution">Viral Pneumonia</li>
          </ul>
        </div>
        <img src={CovidWorksImg} alt="" className="covid-works-img" />
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
              <h5 className="disease-pred-title">Prediction Results: </h5>
              <h5>
                <span className="disease-field"> Disease: </span>
                {getMaxPredictions().label}
              </h5>
              <p>
                <span className="disease-field"> Confidence: </span>
                {Math.round(getMaxPredictions().probability * 10000) / 100}%
              </p>
              {chartData && (
                <div className="chart-container">
                  <Bar
                    data={chartData}
                    options={{
                      scales: {
                        yAxes: [
                          {
                            ticks: {
                              beginAtZero: true,
                            },
                          },
                        ],
                      },
                      plugins: {
                        datalabels: {
                          color: "black",
                        },
                        title: {
                          display: true,
                          text: "Confidence for each Disease",
                        },
                      },
                    }}
                  />
                </div>
              )}
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
