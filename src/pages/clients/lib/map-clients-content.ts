import type { TFunction } from "i18next";

import type { ClientWithScopes } from "@entities/client";

import type { PaginationResponse } from "@shared/types";

import type { ClientsContentData } from "../types";

export const mapClientsContent = (
  { items, meta }: PaginationResponse<ClientWithScopes>,
  t: TFunction
): ClientsContentData => ({
  clients: items,
  title: t("clients.title"),
  description: t("clients.description"),
  createLabel: t("clients.create"),
  pagination: {
    label: t("clients.pagination.label"),
    pageLabel: t("clients.pagination.page", {
      page: Math.floor(meta.offset / meta.limit) + 1,
      total: Math.max(1, Math.ceil(meta.total / meta.limit)),
    }),
    totalLabel: t("clients.pagination.total", { total: meta.total }),
    previousLabel: t("clients.pagination.previous"),
    nextLabel: t("clients.pagination.next"),
    previousOffset: Math.max(0, meta.offset - meta.limit),
    nextOffset: meta.offset + meta.limit,
    canGoPrevious: meta.offset > 0,
    canGoNext: meta.offset + meta.limit < meta.total,
  },
});
