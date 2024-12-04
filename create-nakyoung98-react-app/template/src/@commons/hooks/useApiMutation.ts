import { ApiError } from "@network/services/errors";
import { QueryClient, useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useApiMutation = <TData, TResponse>(
  options: UseMutationOptions<TData, ApiError, TResponse>,
  queryClient?: QueryClient
) => useMutation<TData, ApiError, TResponse>(options, queryClient);
