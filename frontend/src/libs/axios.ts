import axios from "axios";
import { useAuthStore } from "../store/auth";
import { getCookie } from "../customHooks/useCookie";
import { ACCESS_TOKEN } from "../constants";

const baseURL = process.env.REACT_APP_BACKEND_URI;

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const accessToken = getCookie(ACCESS_TOKEN);
  config.headers["Authorization"] = `Bearer ${accessToken ?? ""}`;

  return config;
});

export default instance;

// Create a new Axios instance
// const instance: AxiosInstance = axios.create({
//   baseURL: "http://localhost:5000/api", // Replace with your API base URL
//   timeout: 5000, // Set a timeout value if needed
//   headers: {
//     "Content-Type": "application/json", // Set your desired headers
//     Authorization: `Bearer ${getCookie(ACCESS_TOKEN)}`, // You can add your custom headers here
//   },
// });
