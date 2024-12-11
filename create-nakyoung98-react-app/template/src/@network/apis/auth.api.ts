import { ApiService } from "@network/services/apiService";
import { SigninResponseDTO, SigninResquestDTO } from "@network/types/dtos/auth.dto";

export const AuthAPI = {
  signin: async (params: SigninResquestDTO) =>
    await ApiService.mutateData<SigninResquestDTO, SigninResponseDTO>({
      endpoint: "/signin",
      method: "POST",
      data: params,
    }),
};
