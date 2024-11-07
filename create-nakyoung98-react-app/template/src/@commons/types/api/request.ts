import { HttpMethod } from "./http";

export type FetchRequestParams = Record<string, string>;

export type FetchDataRequest = {
  endpoint: string;
  method: Extract<HttpMethod, "GET">;
  params?: FetchRequestParams;
  headers?: Record<string, string>;
};

export type FetchDataResponse<ResponseDTO> = {
  data: ResponseDTO;
  status: number;
};

export type MutateDataRequest<RequestDTO> = {
  endpoint: string;
  method: Extract<HttpMethod, "POST" | "PUT" | "PATCH">;
  data?: RequestDTO;
  headers?: Record<string, string>;
};

export type MutateDataResponse<ResponseDTO> = {
  data: ResponseDTO;
  status: number;
};

export type DeleteRequestParams = Record<string, string>;

export type DeleteDataRequest = {
  endpoint: string;
  method: Extract<HttpMethod, "DELETE">;
  params?: DeleteRequestParams;
  headers?: Record<string, string>;
};

export type DeleteDataResponse<ResponseDTO> = {
  data: ResponseDTO;
  status: number;
};
