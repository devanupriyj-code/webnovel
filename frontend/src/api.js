import axios from "axios";

const api = axios.create({
  baseURL: "https://webnovel-a5ji.onrender.com/api",
});

export default api;