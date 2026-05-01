import axios from "axios";

const api = axios.create({
  baseURL: "https://webnovel-a5ji.onrender.com/api",
});

// 🔥 attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

export default api;