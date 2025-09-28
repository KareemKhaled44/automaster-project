import axios from "axios";
import { toast } from "react-toastify";

const baseURL = "http://localhost:8000/";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// interceptor للـ request
api.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("access");
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// interceptor للـ response
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh");
        const res = await axios.post("http://127.0.0.1:8000/auth/refresh/", {
          refresh: refresh,
        });

        if (res.status === 200) {
          localStorage.setItem("access", res.data.access);
          api.defaults.headers.common["Authorization"] = "Bearer " + res.data.access;
          originalRequest.headers["Authorization"] = "Bearer " + res.data.access;
          return api(originalRequest);
        }
      } catch (err) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
