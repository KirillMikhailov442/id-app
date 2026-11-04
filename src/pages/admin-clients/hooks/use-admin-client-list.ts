import { useEffect } from "react";
import { useAtom } from "jotai";

import { useGetAllClients } from "@entities/client";

import { useDebounce } from "@shared/lib";

import { ADMIN_CLIENTS_PAGE_SIZE, ADMIN_CLIENTS_SEARCH_DEBOUNCE_MS } from "../model/admin-clients.const";
import { AdminClientsModel } from "../model/admin-clients.model";

export const useAdminClientList = () => {
  const [offset] = useAtom(AdminClientsModel.offsetAtom);
  const [search] = useAtom(AdminClientsModel.searchAtom);
  const [debouncedSearch] = useAtom(AdminClientsModel.debouncedSearchAtom);
  const debouncedValue = useDebounce(search.trim(), ADMIN_CLIENTS_SEARCH_DEBOUNCE_MS);
  const query = useGetAllClients(
    { limit: ADMIN_CLIENTS_PAGE_SIZE, offset, search: debouncedSearch || undefined },
    { throwOnError: false }
  );
  const total = query.data?.meta.total;
  const lastOffset =
    total === undefined
      ? offset
      : Math.max(0, Math.ceil(total / ADMIN_CLIENTS_PAGE_SIZE) - 1) * ADMIN_CLIENTS_PAGE_SIZE;
  const isPageOutOfRange = offset > lastOffset;

  useEffect(() => {
    AdminClientsModel.applySearch(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    if (isPageOutOfRange) AdminClientsModel.setOffset(lastOffset);
  }, [isPageOutOfRange, lastOffset]);

  useEffect(() => () => AdminClientsModel.reset(), []);

  return {
    query,
    search,
    debouncedSearch,
    setSearch: AdminClientsModel.setSearch,
    isPageOutOfRange,
  };
};
