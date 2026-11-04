import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { AuthService } from "../api/auth.service";
import { AuthMutationKeys } from "../model/mutation-keys.const";

export const useLogout = (options?: UseMutationOptions<void, Error, void>) => {
  return useMutation({
    ...options,
    mutationKey: [AuthMutationKeys.Logout],
    mutationFn: () => AuthService.logout(),
    retry: false,
  });
};
