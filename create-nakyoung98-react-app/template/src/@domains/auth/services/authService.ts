import { AuthAPI } from "@network/apis/auth.api";
import { ApiService } from "@network/services/apiService";
import { SigninResponseDTO, SigninResquestDTO } from "@network/types/dtos/auth.dto";

export const AuthService = {
  signin: async (params: SigninResquestDTO) =>
    await ApiService.mutateData<SigninResquestDTO, SigninResponseDTO>({
      endpoint: AuthAPI.SIGN_IN,
      method: "POST",
      data: params,
    }),

  refresh: async () =>
    await ApiService.mutateData<any, SigninResponseDTO>({
      endpoint:AuthAPI.REFRESH,
      method: "POST",
    }),
    
};
