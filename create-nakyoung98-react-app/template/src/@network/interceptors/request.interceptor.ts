import { useAuthStore } from "@domains/auth/stores/authStore";
import { InternalAxiosRequestConfig } from "axios";

export const addAuthTokenInterceptor = (config: InternalAxiosRequestConfig<any>) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (typeof accessToken == "string" && accessToken.trim() !== "") {
    config.headers.Authorization = accessToken;
  }
  return config;
};

