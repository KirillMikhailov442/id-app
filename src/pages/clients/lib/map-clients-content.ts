import type { TFunction } from "i18next";

import type { Client } from "@entities/client";

import { getPaginationControls } from "@shared/lib";
import type { PaginationResponse } from "@shared/types";

import type { ClientsContentData } from "../types";

export const mapClientsContent = ({ items, meta }: PaginationResponse<Client>, t: TFunction): ClientsContentData => {
  const { page, pageCount, ...controls } = getPaginationControls(meta);

  return {
    clients: items,
    pagination: {
      label: t("clients.pagination.label"),
      pageLabel: t("clients.pagination.page", {
        page,
        total: pageCount,
      }),
      totalLabel: t("clients.pagination.total", { total: meta.total }),
      previousLabel: t("clients.pagination.previous"),
      nextLabel: t("clients.pagination.next"),
      ...controls,
    },
  };
};
