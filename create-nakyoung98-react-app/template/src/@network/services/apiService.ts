import axiosInstance from "@lib/axios";
import { ApiError } from "./errors";
import {
  DeleteDataRequest,
  FetchDataRequest,
  MutateDataRequest,
  RequestParams,
  Response,
} from "@network/types/request.type";
import { HttpMethod } from "@network/types/http.type";

export const ApiService = {
  async fetchData<ResponseDTO>({
    endpoint,
    method,
    params,
    headers,
  }: FetchDataRequest): Promise<Response<ResponseDTO>> {
    return this.request<ResponseDTO>({
      endpoint,
      method,
      params,
      headers,
    });
  },

  async mutateData<RequestDTO, ResponseDTO>(request: MutateDataRequest<RequestDTO>): Promise<Response<ResponseDTO>> {
    return this.request<ResponseDTO, RequestDTO>(request);
  },

  async deleteData<ResponseDTO>(request: DeleteDataRequest): Promise<Response<ResponseDTO>> {
    return this.request<ResponseDTO>(request);
  },

  async request<ResponseDTO, RequestDTO = unknown>({
    endpoint,
    method,
    params,
    data,
    headers,
  }: {
    endpoint: string;
    method: HttpMethod;
    params?: RequestParams;
    data?: RequestDTO;
    headers?: Record<string, string>;
  }): Promise<Response<ResponseDTO>> {
    try {
      const response = await axiosInstance.request({
        url: endpoint,
        method,
        params,
        data,
        headers,
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw ApiError.fromAxiosError(error);
    }
  },
};
