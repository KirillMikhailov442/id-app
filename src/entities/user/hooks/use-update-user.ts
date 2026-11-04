import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UserService } from "../api/user.service";
import { updateUserCache } from "../lib/update-user-cache";
import { UserMutationKeys } from "../model/mutation-keys.const";
import type { UpdateUserParams } from "../types";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [UserMutationKeys.UpdateUser],
    mutationFn: ({ id, data }: UpdateUserParams) => UserService.update(id, data),
    retry: false,
    onSuccess: (user) => updateUserCache(queryClient, user),
  });
};
