import axios from "axios";

const API = axios.create({
  baseURL: "https://osct-backend-1.onrender.com/api",
  withCredentials: false,
});

// 🔐 Attach JWT automatically to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
