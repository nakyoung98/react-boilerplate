import axiosInstance from "@lib/axios";
import { ApiError } from "./errors";
import {
  DeleteDataRequest,
  DeleteDataResponse,
  FetchDataRequest,
  FetchDataResponse,
  MutateDataRequest,
  MutateDataResponse,
} from "@commons/types/api/request";

export default class ApiService {
  async fetchData<ResponseDTO>({
    endpoint,
    method,
    params,
    headers,
  }: FetchDataRequest): Promise<FetchDataResponse<ResponseDTO>> {
    try {
      const response = await axiosInstance.request({
        url: endpoint,
        method,
        params,
        headers,
      });
      return response.data;
    } catch (error) {
      throw ApiError.fromAxiosError(error);
    }
  }

  async mutateData<RequestDTO, ResponseDTO>({
    endpoint,
    method,
    data,
    headers,
  }: MutateDataRequest<RequestDTO>): Promise<MutateDataResponse<ResponseDTO>> {
    try {
      const response = await axiosInstance.request({
        url: endpoint,
        method,
        data,
        headers,
      });
      return response.data;
    } catch (error) {
      throw ApiError.fromAxiosError(error);
    }
  }

  async deleteData<ResponseDTO>({
    endpoint,
    method,
    params,
    headers,
  }: DeleteDataRequest): Promise<DeleteDataResponse<ResponseDTO>> {
    try {
      const response = await axiosInstance.request({
        url: endpoint,
        method,
        params,
        headers,
      });
      return response.data;
    } catch (error) {
      throw ApiError.fromAxiosError(error);
    }
  }
}
