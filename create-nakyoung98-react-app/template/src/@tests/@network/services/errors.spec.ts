import { ERROR_CODE } from "@network/consts/error";
import { ApiError } from "@network/services/errors";
import axios, { AxiosError, AxiosHeaders } from "axios";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("ApiError", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fromAxiosError가 서버측 에러를 잡아내는가", () => {
    //Given
    const serverError = new AxiosError(
      "server error",
      undefined,
      undefined,
      {},
      {
        status: 400,
        data: {
          message: "BadRequest",
          code: "INVALID_PARAM",
        },
        statusText: "",
        headers: {},
        config: { headers: new AxiosHeaders() },
      }
    );

    //When
    const apiError = ApiError.fromAxiosError(serverError);

    //Then
    expect(apiError).toBeInstanceOf(ApiError);
    expect(apiError.status).toBe(serverError.status);
    expect(apiError.data).toMatchObject(serverError.response!.data);
  });

  it("fromAxiosError가 Timeout 에러를 잡아내는가", () => {
    //Given
    const timeoutError = new AxiosError("timeout error", "ECONNABORTED", undefined, {}, undefined);

    //When
    const apiError = ApiError.fromAxiosError(timeoutError);

    //Then
    expect(apiError).toBeInstanceOf(ApiError);
    expect(apiError.status).toBe(408);
    expect(apiError.code).toBe(ERROR_CODE.TIMEOUT);
  });

  it("fromAxiosError가 취소 에러를 잡아내는가", () => {
    //Given
    const cancelError = new AxiosError("cancel", "", undefined, {}, undefined);
    vi.spyOn(axios, "isCancel").mockReturnValueOnce(true); //isCancel 모킹

    //When
    const apiError = ApiError.fromAxiosError(cancelError);

    //Then
    expect(apiError).toBeInstanceOf(ApiError);
    expect(apiError.status).toBe(499);
    expect(apiError.code).toBe(ERROR_CODE.USER_CANCEL);
  });

  it("fromAxiosError가 일반적인 네트워크 에러를 잡아내는가", () => {
    //Given
    const networkError = new AxiosError("network error", "", undefined, {}, undefined);

    //When
    const apiError = ApiError.fromAxiosError(networkError);

    //Then
    expect(apiError).toBeInstanceOf(ApiError);
    expect(apiError.status).toBe(502);
    expect(apiError.code).toBe(ERROR_CODE.NETWORK_ERROR);
    expect(apiError.message).toBe("Network Error");
  });

  it("fromAxiosError가 AxiosError가 아닌 경우를 잡아내는가", () => {
    //Given
    const otherError = new Error();

    //When & Then
    expect(() => ApiError.fromAxiosError(otherError)).toThrowError(Error);
  });

  it("fromAxiosError가 알 수 없는 error를 잡아내는가", () => {
    //Given
    const unknownError = new AxiosError("unknown Error", "");

    //When
    const apiError = ApiError.fromAxiosError(unknownError);

    //Then
    expect(apiError).toBeInstanceOf(ApiError);
    expect(apiError.status).toBe(500);
    expect(apiError.code).toBe(ERROR_CODE.UNKNOWN_ERROR);
  });
});
