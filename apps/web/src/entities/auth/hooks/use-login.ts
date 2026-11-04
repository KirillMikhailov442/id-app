import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import type { TokenResponse } from "@shared/api";

import { AuthService } from "../api/auth.service";
import { AuthMutationKeys } from "../model/mutation-keys.const";
import type { LoginRequest } from "../types";

export const useLogin = (options?: UseMutationOptions<TokenResponse, Error, LoginRequest>) => {
  return useMutation({
    ...options,
    mutationKey: [AuthMutationKeys.Login],
    mutationFn: (data: LoginRequest) => AuthService.login(data),
    retry: false,
  });
};
