import axios from "axios";
const baseURL = "http://localhost:8080";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL,
});
const data = JSON.parse(localStorage.getItem("auth"));

axios.defaults.headers.common["Authorization"] = data?.token;

// Add a request interceptor to set the Authorization header and content type
axiosInstance.interceptors.request.use(
  (config) => {
    // Set the content type to JSON
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default axiosInstance;
