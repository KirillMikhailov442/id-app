import { useEffect } from "react";
import { useAtom } from "jotai";

import { useGetAllUsers } from "@entities/user";

import { useDebounce } from "@shared/lib";

import { ADMIN_USERS_PAGE_SIZE, ADMIN_USERS_SEARCH_DEBOUNCE_MS } from "../model/admin-users.const";
import { AdminUsersModel } from "../model/admin-users.model";

export const useAdminUsers = () => {
  const [offset] = useAtom(AdminUsersModel.offsetAtom);
  const [search] = useAtom(AdminUsersModel.searchAtom);
  const [debouncedSearch] = useAtom(AdminUsersModel.debouncedSearchAtom);
  const debouncedValue = useDebounce(search.trim(), ADMIN_USERS_SEARCH_DEBOUNCE_MS);
  const query = useGetAllUsers(
    { limit: ADMIN_USERS_PAGE_SIZE, offset, search: debouncedSearch || undefined },
    { throwOnError: false }
  );
  const total = query.data?.meta.total;
  const lastOffset =
    total === undefined ? offset : Math.max(0, Math.ceil(total / ADMIN_USERS_PAGE_SIZE) - 1) * ADMIN_USERS_PAGE_SIZE;
  const isPageOutOfRange = offset > lastOffset;

  useEffect(() => {
    AdminUsersModel.applySearch(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    if (isPageOutOfRange) AdminUsersModel.setOffset(lastOffset);
  }, [isPageOutOfRange, lastOffset]);

  useEffect(() => () => AdminUsersModel.reset(), []);

  return {
    query,
    search,
    debouncedSearch,
    setSearch: AdminUsersModel.setSearch,
    isPageOutOfRange,
  };
};
