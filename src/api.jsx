import axios from "axios";

const API = axios.create({
  baseURL: "https://osct-backend-1.onrender.com/api/auth",
  withCredentials: false,
});

export default API;
