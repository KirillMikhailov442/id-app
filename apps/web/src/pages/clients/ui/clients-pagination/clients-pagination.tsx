import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@id-app/shadcn";

import type { ClientsPaginationData } from "../../types";
import s from "./clients-pagination.module.scss";

interface ClientsPaginationProps {
  pagination: ClientsPaginationData;
  disabled: boolean;
  onPageChange: (offset: number) => void;
}

export const ClientsPagination = ({ pagination, disabled, onPageChange }: ClientsPaginationProps) => (
  <nav aria-label={pagination.label} className={s.pagination}>
    <span className={s.total}>{pagination.totalLabel}</span>
    <div className={s.controls}>
      <Button
        disabled={disabled || !pagination.canGoPrevious}
        onClick={() => onPageChange(pagination.previousOffset)}
        type="button"
        variant="outline"
      >
        <ChevronLeft aria-hidden="true" />
        {pagination.previousLabel}
      </Button>
      <span aria-live="polite" className={s.page}>
        {pagination.pageLabel}
      </span>
      <Button
        disabled={disabled || !pagination.canGoNext}
        onClick={() => onPageChange(pagination.nextOffset)}
        type="button"
        variant="outline"
      >
        {pagination.nextLabel}
        <ChevronRight aria-hidden="true" />
      </Button>
    </div>
  </nav>
);
