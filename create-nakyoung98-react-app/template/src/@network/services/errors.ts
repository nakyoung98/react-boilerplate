import { ERROR_CODE } from "@network/consts/error";
import axios from "axios";

export class ApiError extends Error {
  constructor(public status: number, message: string, public code?: string, public data?: unknown) {
    super(message);
    this.name = "ApiError";
  }

  static fromAxiosError(error: unknown) {
    if (!axios.isAxiosError(error)) {
      throw new Error("Not an Axios Error");
    }

    if (error.response) {
      return new ApiError(
        error.response.status,
        error.response.data?.message || error.message,
        error.response.data?.code || error.code,
        error.response.data
      );
    } else if (error.request) {
      //timeout
      if (error.code === "ECONNABORTED") {
        return new ApiError(error.status || 408, error.message, ERROR_CODE.TIMEOUT);
      }
      if (axios.isCancel(error)) {
        return new ApiError(error.status || 499, error.message, ERROR_CODE.USER_CANCEL);
      }
      return new ApiError(502, "Network Error", ERROR_CODE.NETWORK_ERROR);
    }
    return new ApiError(500, error.message, ERROR_CODE.UNKNOWN_ERROR);
  }
}
