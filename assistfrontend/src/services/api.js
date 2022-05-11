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

const segmentCancer = (body) => {
  return axios.post(API_URL + "/breastcancer/segment", body);
};

const apiFunctions = {
  getDiseaseSymptoms,
  predictDisease,
  predictCovid,
  predictFracture,
  segmentCancer,
};
export default apiFunctions;
