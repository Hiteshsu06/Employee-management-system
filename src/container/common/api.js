import axios from "axios";
// import { headers } from './headerConstant';

const apiBaseURL = "http://localhost:3000";

export const allApi = (url, data, method) => {
  if (method === "post") {
    return axios.post(`${apiBaseURL}/${url}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  if (method === "get") {
    return axios.get(`${apiBaseURL}/${url}`);
  }
  if (method === "delete") {
    return axios.delete(`${apiBaseURL}/${url}`);
  }
  if (method === "put") {
    return axios?.put(`${apiBaseURL}/${url}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
};

export const allApiWithHeaders = (dataurl, data, method) => {
  let token = localStorage.getItem("Token");

  let apiCall = "";
  if ("delete" === method) {
    apiCall = axios?.delete(`${apiBaseURL}/${dataurl}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    apiCall.catch((error) => {
      if (error?.response?.status === 401) {
        localStorage.removeItem("UserData");
      }
    });
    return apiCall;
  }
};
