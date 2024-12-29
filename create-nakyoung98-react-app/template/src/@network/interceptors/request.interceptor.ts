import { AuthService } from "@domains/auth/services/authService";
import { useAuthStore } from "@domains/auth/stores/authStore";
import JWTUtils from "@domains/auth/utils/jwt.util";
import { AuthAPI } from "@network/apis/auth.api";
import { PUBLIC_API } from "@network/apis/public.api";
import { ERROR_CODE } from "@network/consts/error";
import { ApiError } from "@network/services/errors";
import { InternalAxiosRequestConfig } from "axios";

export const addAuthTokenInterceptor = async (config: InternalAxiosRequestConfig<any>) => {
  //public 목록의 경우 인터셉터 무시
  if (PUBLIC_API.some((url) => config.url?.includes(url))) {
    return config;
  }

  //토큰 갱신 요청 시에는 인터셉터 무시
  if (config.url?.includes(AuthAPI.REFRESH)) {
    return config;
  }

  const accessToken = useAuthStore.getState().accessToken;

  // AccessToken 존재
  if (typeof accessToken == "string" && accessToken.trim() !== "") {
    // token 유효성 검사
    const tokenPayload = useAuthStore.getState().tokenPayload;
    if (tokenPayload && JWTUtils.isExpValid(tokenPayload)) {
      config.headers.Authorization = accessToken;
      return config;
    }
  }

  // AccessToken 미존재(RefreshToken은 HttpOnly로 접근할 수 없으므로 바로 refresh 요청 보냄)
  try {
    const {
      data: { accessToken: newAccessToken },
    } = await AuthService.refresh();
    const setAccessToken = useAuthStore.getState().setAccessToken;

    if (!newAccessToken) {
      return Promise.reject(new ApiError(404, ERROR_CODE.UNKNOWN_ERROR));
    }

    setAccessToken(newAccessToken);
    config.headers.Authorization = newAccessToken;
    return config;
  } catch (error: any) {
    return Promise.reject(error);
  }
};
