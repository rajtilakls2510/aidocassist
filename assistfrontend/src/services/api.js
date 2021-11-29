import axios from "axios";

const API_URL = "http://localhost:5000";

// ===================== Disease Predictor ====================

const getDiseaseSymptoms = () => {
  return axios.get(API_URL + "/disease");
};

const predictDisease = (symptoms) => {
  return axios.post(API_URL + "/disease/predict", symptoms);
};

export default {
  getDiseaseSymptoms,
  predictDisease,
};
