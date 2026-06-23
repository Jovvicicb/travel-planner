import axios from "axios";
import { getAccessToken, removeAccessToken } from "../helpers/tokenHelper";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      removeAccessToken();
    }

    const message =
      error.response?.data?.message ||
      "An error occurred while communicating with the server.";

    return Promise.reject(new Error(message));
  }
);