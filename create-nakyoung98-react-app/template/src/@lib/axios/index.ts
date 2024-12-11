import { addAuthTokenInterceptor } from "@network/interceptors/request.interceptor";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(addAuthTokenInterceptor);


export default axiosInstance;
