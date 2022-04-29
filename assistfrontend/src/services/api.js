import axios from "axios";

const API_URL = "http://192.168.29.153:5000";

// ===================== Disease Predictor ====================

const getDiseaseSymptoms = () => {
  return axios.get(API_URL + "/disease");
};

const predictDisease = (symptoms) => {
  return axios.post(API_URL + "/disease/predict", symptoms);
};

const predictCovid = (body) => {
  return axios.post(API_URL + "/covidpneumonia/predict", body);
};

const predictFracture = (body) => {
  return axios.post(API_URL + "/fracture/detect", body);
};

const apiFunctions = {
  getDiseaseSymptoms,
  predictDisease,
  predictCovid,
  predictFracture,
};
export default apiFunctions;
