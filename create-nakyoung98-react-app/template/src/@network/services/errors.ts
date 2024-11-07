import axios from "axios";

export class ApiError extends Error {
  constructor(public status: number, message: string, public code?: string, public data?: unknown) {
    super(message);
    this.name = "ApiError";
  }

  static fromAxiosError(error: unknown) {
    if (axios.isAxiosError(error)) {
      return new ApiError(error.response?.status || 500, error.message, error.code, error.response?.data);
    }
  }
}
