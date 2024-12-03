import { describe, beforeEach, expect, it, vi } from "vitest";
import { ApiService } from "@network/services/apiService";
import { SigninResponseDTO, SigninResquestDTO } from "@network/types/dtos/auth.dto";
import { AuthAPI } from "@network/apis/auth.api";
import { ApiError } from "@network/services/errors";

// mocking
vi.mock("@network/services/apiService", () => ({
  ApiService: {
    mutateData: vi.fn(),
  },
}));

describe("AuthAPI", () => {
  beforeEach(() => {
    // mock clear before test
    vi.clearAllMocks();
  });

  describe("signin", () => {
    const mockSigninRequest: SigninResquestDTO = {
      id: "nakyoung",
      password: "test1234!",
    };

    const mockSigninResponse: SigninResponseDTO = {
      accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    };

    it("로그인 API가 올바른 엔드포인트, 메서드, 데이터로 정확히 한 번 호출되는가", async () => {
      //Given
      (ApiService.mutateData as any).mockResolvedValueOnce(mockSigninResponse);

      //When
      await AuthAPI.signin(mockSigninRequest);

      //Then
      expect(ApiService.mutateData).toHaveBeenCalledWith({
        endpoint: "/signin",
        method: "POST",
        data: mockSigninRequest,
      });
      expect(ApiService.mutateData).toHaveBeenCalledTimes(1);
    });

    it("API 에러를 올바르게 처리하는가", async () => {
      //Given
      const mockError = new ApiError(401, "이메일 또는 비밀번호가 올바르지 않습니다");
      (ApiService.mutateData as any).mockRejectedValueOnce(mockError);

      //When, Then
      await expect(AuthAPI.signin(mockSigninRequest)).rejects.toEqual(
        expect.objectContaining({
          status: 401,
          message: "이메일 또는 비밀번호가 올바르지 않습니다",
        })
      );
    });
  });
});
