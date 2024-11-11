import { HttpMethod } from "./http";

type BaseRequest = {
  endpoint: string;
  headers?: Record<string, string>;
};

export type RequestParams = Record<string, string>;

export type FetchDataRequest = BaseRequest & {
  method: Extract<HttpMethod, "GET">;
  params?: RequestParams;
};

export type MutateDataRequest<RequestDTO> = BaseRequest & {
  method: Extract<HttpMethod, "POST" | "PUT" | "PATCH">;
  data: RequestDTO;
};

export type DeleteDataRequest = BaseRequest & {
  method: Extract<HttpMethod, "DELETE">;
  params?: RequestParams; // ID외 추가 params가 필요할 수 있음
};

export type Response<ResponseDTO> = {
  data: ResponseDTO;
  status: number;
};
