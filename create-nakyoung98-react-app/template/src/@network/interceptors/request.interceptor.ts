import { useAuthStore } from "@domains/auth/stores/authStore";
import axiosInstance from "@lib/axios";

axiosInstance.interceptors.request.use((config) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  if (typeof accessToken == 'string' && accessToken.trim() !== "" ) {
    config.headers.Authorization = accessToken;
  }
  return config;
});
