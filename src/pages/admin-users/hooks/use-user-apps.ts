import { useEffect } from "react";
import { useAtom } from "jotai";

import { useGetUserOAuthGrants } from "@entities/oauth-grant";

import { AdminUsersModel } from "../model/admin-users.model";
import { USER_APPS_PAGE_SIZE } from "../model/user-apps.const";

export const useUserApps = (userId: string, open: boolean) => {
  const [offset] = useAtom(AdminUsersModel.appsOffsetAtom);
  const query = useGetUserOAuthGrants(userId, { limit: USER_APPS_PAGE_SIZE, offset }, open);
  const total = query.data?.meta.total;
  const lastOffset =
    total === undefined ? offset : Math.max(0, Math.ceil(total / USER_APPS_PAGE_SIZE) - 1) * USER_APPS_PAGE_SIZE;
  const isPageOutOfRange = offset > lastOffset;

  useEffect(() => {
    if (isPageOutOfRange) AdminUsersModel.setAppsOffset(lastOffset);
  }, [isPageOutOfRange, lastOffset]);

  return { query, isPageOutOfRange, setOffset: AdminUsersModel.setAppsOffset };
};
