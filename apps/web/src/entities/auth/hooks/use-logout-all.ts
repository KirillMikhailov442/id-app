import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { AuthService } from "../api/auth.service";
import { AuthMutationKeys } from "../model/mutation-keys.const";

export const useLogoutAll = (options?: UseMutationOptions<void, Error, void>) => {
  return useMutation({
    ...options,
    mutationKey: [AuthMutationKeys.LogoutAll],
    mutationFn: () => AuthService.logoutAll(),
    retry: false,
  });
};
