import axios from "axios";
import { API_BASE_URL } from "@/core/constants";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour gérer les erreurs globalement
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Gérer les erreurs globales ici (ex: redirection vers la page de connexion si 401)
    return Promise.reject(error);
  }
);

export default api;
