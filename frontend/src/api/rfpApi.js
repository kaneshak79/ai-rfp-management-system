import axios from "axios";

const API_URL = "http://localhost:5000/api/rfps";

export const getRFPs = async () => {
  return axios.get(API_URL);
};

export const createRFP = async (data) => {
  return axios.post(API_URL, data);
};
