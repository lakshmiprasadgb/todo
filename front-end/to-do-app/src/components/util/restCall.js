import axios from "axios";
import config from "./../../config";

export const getCall = (url, data) => {
  return axios.get(`${config.host}:${config.port}/${url}`, data);
};
export const postCall = (url, data, headers = {}) => {
  return axios.post(`${config.host}:${config.port}/${url}`, data, headers);
};
export const deleteCall = (url, data, headers = {}) => {
  return axios.delete(`${config.host}:${config.port}/${url}`, data, headers);
};
