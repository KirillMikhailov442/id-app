import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { getPaginationControls } from "@shared/lib";
import type { PaginationMeta } from "@shared/types";

import { Button } from "@id-app/shadcn";

import { AdminUsersModel } from "../../model/admin-users.model";
import s from "./users-pagination.module.scss";

interface UsersPaginationProps {
  meta: PaginationMeta;
  disabled: boolean;
}

export const UsersPagination = ({ meta, disabled }: UsersPaginationProps) => {
  const { t } = useTranslation();
  const { page, pageCount, previousOffset, nextOffset, canGoPrevious, canGoNext } = getPaginationControls(meta);

  return (
    <nav aria-label={t("adminUsers.pagination.label")} className={s.pagination}>
      <span className={s.total}>{t("adminUsers.pagination.total", { total: meta.total })}</span>
      <div className={s.controls}>
        <Button
          disabled={disabled || !canGoPrevious}
          onClick={() => AdminUsersModel.setOffset(previousOffset)}
          type="button"
          variant="outline"
        >
          <ChevronLeft aria-hidden="true" />
          {t("adminUsers.pagination.previous")}
        </Button>
        <span aria-live="polite" className={s.page}>
          {t("adminUsers.pagination.page", { page, total: pageCount })}
        </span>
        <Button
          disabled={disabled || !canGoNext}
          onClick={() => AdminUsersModel.setOffset(nextOffset)}
          type="button"
          variant="outline"
        >
          {t("adminUsers.pagination.next")}
          <ChevronRight aria-hidden="true" />
        </Button>
      </div>
    </nav>
  );
};
