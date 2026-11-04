import { useEffect } from "react";
import { useAtom } from "jotai";

import { useGetUserSessions } from "@entities/session";

import { AdminUsersModel } from "../model/admin-users.model";
import { USER_SESSIONS_PAGE_SIZE } from "../model/user-sessions.const";

export const useUserSessions = (userId: string, open: boolean) => {
  const [offset] = useAtom(AdminUsersModel.sessionsOffsetAtom);
  const query = useGetUserSessions(userId, { limit: USER_SESSIONS_PAGE_SIZE, offset }, open);
  const total = query.data?.meta.total;
  const lastOffset =
    total === undefined
      ? offset
      : Math.max(0, Math.ceil(total / USER_SESSIONS_PAGE_SIZE) - 1) * USER_SESSIONS_PAGE_SIZE;
  const isPageOutOfRange = offset > lastOffset;

  useEffect(() => {
    if (isPageOutOfRange) AdminUsersModel.setSessionsOffset(lastOffset);
  }, [isPageOutOfRange, lastOffset]);

  return { query, isPageOutOfRange, setOffset: AdminUsersModel.setSessionsOffset };
};
