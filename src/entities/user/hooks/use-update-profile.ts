import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";

import { SessionModel, type SessionUser } from "@shared/api";
import { jotaiStore } from "@shared/lib";

import { UserService } from "../api/user.service";
import { UserMutationKeys } from "../model/mutation-keys.const";
import { UserQueryKeys } from "../model/query-keys.const";
import type { UpdateProfileRequest } from "../types";

export const useUpdateProfile = (options?: UseMutationOptions<SessionUser, Error, UpdateProfileRequest>) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restOptions } = options ?? {};

  return useMutation({
    ...restOptions,
    mutationKey: [UserMutationKeys.UpdateProfile],
    mutationFn: (data: UpdateProfileRequest) => UserService.updateProfile(data),
    retry: false,
    onSuccess: async (...args) => {
      const [user] = args;

      await Promise.all([
        queryClient.cancelQueries({ queryKey: [UserQueryKeys.Profile, user.id] }),
        queryClient.cancelQueries({ queryKey: [UserQueryKeys.GetUser, user.id] }),
      ]);
      queryClient.setQueryData([UserQueryKeys.Profile, user.id], user);
      queryClient.setQueryData([UserQueryKeys.GetUser, user.id], user);

      if (jotaiStore.get(SessionModel.userAtom)?.id === user.id) {
        SessionModel.setUser(user);
      }

      await queryClient.invalidateQueries({ queryKey: [UserQueryKeys.GetAllUsers] });
      await onSuccess?.(...args);
    },
  });
};
