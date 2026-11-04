import type { QueryClient } from "@tanstack/react-query";

import { SessionQueryKeys } from "../model/query-keys.const";

export const invalidateUserSessions = async (queryClient: QueryClient, userId: string): Promise<void> => {
  const filters = [
    { queryKey: [SessionQueryKeys.GetUserSessions, userId] },
    { queryKey: [SessionQueryKeys.GetAll, userId] },
  ];

  await Promise.all(filters.map((filter) => queryClient.cancelQueries(filter)));
  await Promise.all(filters.map((filter) => queryClient.invalidateQueries(filter)));
};
