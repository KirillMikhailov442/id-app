import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { UserService } from "../api/user.service";
import { UserMutationKeys } from "../model/mutation-keys.const";
import type { ChangePasswordRequest } from "../types";

export const useChangePassword = (options?: UseMutationOptions<void, Error, ChangePasswordRequest>) =>
  useMutation({
    ...options,
    mutationKey: [UserMutationKeys.ChangePassword],
    mutationFn: (data: ChangePasswordRequest) => UserService.changePassword(data),
    retry: false,
  });
