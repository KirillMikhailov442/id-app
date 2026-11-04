import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UserService } from "../api/user.service";
import { updateUserCache } from "../lib/update-user-cache";
import { UserMutationKeys } from "../model/mutation-keys.const";
import type { SetUserBlockedParams } from "../types";

export const useSetUserBlocked = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [UserMutationKeys.SetUserBlocked],
    mutationFn: ({ id, blocked }: SetUserBlockedParams) => UserService.setBlocked(id, blocked),
    retry: false,
    onSuccess: (user) => updateUserCache(queryClient, user),
  });
};
