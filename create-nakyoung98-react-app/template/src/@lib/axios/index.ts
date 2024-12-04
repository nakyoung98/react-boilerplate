import axios from "axios";

const BASE_URL = "https://67bd8fd8-9858-45fd-bd38-68f471d8b44c.mock.pstmn.io";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
