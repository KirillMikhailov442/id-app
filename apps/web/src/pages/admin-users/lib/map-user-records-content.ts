import type { TFunction } from "i18next";

import { getPaginationControls } from "@shared/lib";
import type { PaginationResponse } from "@shared/types";

import type { UserRecordsContent } from "../types";

export const mapUserRecordsContent = <TRecord>(
  data: PaginationResponse<TRecord> | undefined,
  kind: "apps" | "sessions",
  t: TFunction
): UserRecordsContent<TRecord> | undefined => {
  if (data === undefined) return undefined;

  const { items, meta } = data;
  const { page, pageCount, ...controls } = getPaginationControls(meta);

  return {
    items,
    pagination: {
      ...controls,
      label: t(`adminUsers.${kind}.pagination`),
      totalLabel: t(`adminUsers.${kind}.total`, { total: meta.total }),
      pageLabel: t("adminUsers.pagination.page", { page, total: pageCount }),
      previousLabel: t("adminUsers.pagination.previous"),
      nextLabel: t("adminUsers.pagination.next"),
    },
  };
};
