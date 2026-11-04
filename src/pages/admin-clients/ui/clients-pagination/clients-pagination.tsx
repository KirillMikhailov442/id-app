import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import type { PaginationMeta } from "@shared/types";

import { Button } from "@id-app/shadcn";

import { AdminClientsModel } from "../../model/admin-clients.model";
import s from "./clients-pagination.module.scss";

interface ClientsPaginationProps {
  meta: PaginationMeta;
  disabled: boolean;
}

export const ClientsPagination = ({ meta, disabled }: ClientsPaginationProps) => {
  const { t } = useTranslation();
  const page = Math.floor(meta.offset / meta.limit) + 1;
  const total = Math.max(1, Math.ceil(meta.total / meta.limit));

  return (
    <nav aria-label={t("adminClients.pagination.label")} className={s.pagination}>
      <span className={s.total}>{t("adminClients.pagination.total", { total: meta.total })}</span>
      <div className={s.controls}>
        <Button
          disabled={disabled || meta.offset <= 0}
          onClick={() => AdminClientsModel.setOffset(Math.max(0, meta.offset - meta.limit))}
          type="button"
          variant="outline"
        >
          <ChevronLeft aria-hidden="true" />
          {t("adminClients.pagination.previous")}
        </Button>
        <span aria-live="polite" className={s.page}>
          {t("adminClients.pagination.page", { page, total })}
        </span>
        <Button
          disabled={disabled || meta.offset + meta.limit >= meta.total}
          onClick={() => AdminClientsModel.setOffset(meta.offset + meta.limit)}
          type="button"
          variant="outline"
        >
          {t("adminClients.pagination.next")}
          <ChevronRight aria-hidden="true" />
        </Button>
      </div>
    </nav>
  );
};
