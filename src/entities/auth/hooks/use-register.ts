import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { AuthService } from "../api/auth.service";
import { AuthMutationKeys } from "../model/mutation-keys.const";
import type { RegisterRequest, RegisterResponse } from "../types";

export const useRegister = (options?: UseMutationOptions<RegisterResponse, Error, RegisterRequest>) => {
  return useMutation({
    ...options,
    mutationKey: [AuthMutationKeys.Register],
    mutationFn: (data: RegisterRequest) => AuthService.register(data),
    retry: false,
  });
};
