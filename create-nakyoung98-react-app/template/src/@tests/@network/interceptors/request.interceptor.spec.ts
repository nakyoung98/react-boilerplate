import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { setupServer } from "msw/node";
import axiosInstance from "@lib/axios";
import { useAuthStore } from "@domains/auth/stores/authStore";
import { http, HttpResponse } from "msw";
import { AuthMockAPI } from "@mocks/auth.mock";
import { ERROR_CODE } from "@network/consts/error";
import { AuthService } from "@domains/auth/services/authService";

const server = setupServer(
  ...AuthMockAPI,
  // 테스트용 protected API 엔드포인트 추가
  http.get("/api/protected", () => {
    return HttpResponse.json({ message: "success" });
  }),
  http.get(
    "/public/reset-cookie",
    ({}) =>
      new HttpResponse(null, {
        headers: {
          "Content-type": "application/json",
          "Set-Cookie": `refresh-token=; Path=/; HttpOnly; SameSite=Strict; max-age=0`,
        },
      })
  )
);

describe("Auth Interceptor Test", () => {
  beforeAll(() => {
    server.listen();
  });
  beforeEach(async () => {
    server.resetHandlers();
    await axiosInstance.get("/public/reset-cookie");
    useAuthStore.getState().reset(); // 스토어 초기화
  });
  afterAll(() => server.close());

  it("토큰이 없을 경우 자동으로 refresh 후 요청 성공", async () => {
    // Given
    // 로그인하여 refresh token 쿠키 설정
    await AuthService.signin({ id: "test", password: "test" });

    // When
    const response = await axiosInstance.get("/api/protected");
    // Then
    expect(response.status).toBe(200);
    expect(response.data).toEqual({ message: "success" });
    expect(useAuthStore.getState().accessToken).toBeTruthy();
  });

  it("refresh token이 만료된 경우 401 에러", async () => {
    // When & Then
    try {
      await axiosInstance.get("/api/protected");
    } catch (error: any) {
      console.log(error);
    }

    await expect(axiosInstance.get("/api/protected")).rejects.toMatchObject({
      response: {
        status: 401,
        data: {
          code: ERROR_CODE.INVALID_TOKEN,
        },
      },
    });
  });
});
