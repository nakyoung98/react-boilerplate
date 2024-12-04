import { ApiError } from "@network/services/errors";
import { QueryClient, useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useApiQuery = <TData>(options: UseQueryOptions<TData, ApiError>, queryClient?: QueryClient) =>
  useQuery<TData, ApiError>(options, queryClient);
