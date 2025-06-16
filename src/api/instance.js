import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  //withCredentials: true,
});

//console.log("API URL:", process.env.REACT_APP_API_URL);

// ✅ 모든 요청에 accessToken 자동 삽입
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
