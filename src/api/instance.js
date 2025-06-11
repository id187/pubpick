import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout : 10000,
  withCredentials: true,
});

//console.log("API URL:", process.env.REACT_APP_API_URL);
