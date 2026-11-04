import { useEffect } from "react";
import { useAtom } from "jotai";

import { useGetClients } from "@entities/client";
import { useGetAllScopes } from "@entities/scope";

import { CLIENTS_PAGE_SIZE } from "../model/clients.const";
import { ClientsModel } from "../model/clients.model";

export const useClients = () => {
  const [offset] = useAtom(ClientsModel.offsetAtom);
  const clientsQuery = useGetClients({ limit: CLIENTS_PAGE_SIZE, offset }, { throwOnError: false });
  const scopesQuery = useGetAllScopes({ throwOnError: false });

  const total = clientsQuery.data?.meta.total;
  const lastOffset =
    total === undefined ? offset : Math.max(0, Math.ceil(total / CLIENTS_PAGE_SIZE) - 1) * CLIENTS_PAGE_SIZE;
  const isPageOutOfRange = offset > lastOffset;

  useEffect(() => {
    if (isPageOutOfRange) {
      ClientsModel.setOffset(lastOffset);
    }
  }, [isPageOutOfRange, lastOffset]);

  useEffect(() => () => ClientsModel.reset(), []);

  const refetch = async (): Promise<void> => {
    await Promise.all([clientsQuery.refetch(), scopesQuery.refetch()]);
  };

  return { clientsQuery, scopesQuery, refetch, isPageOutOfRange };
};
