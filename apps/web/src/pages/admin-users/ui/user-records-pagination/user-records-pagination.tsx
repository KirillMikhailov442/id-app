import { Button } from "@id-app/shadcn";

import type { UserRecordsPaginationData } from "../../types";
import s from "./user-records-pagination.module.scss";

interface UserRecordsPaginationProps {
  data: UserRecordsPaginationData;
  disabled: boolean;
  onPageChange: (offset: number) => void;
}

export const UserRecordsPagination = ({ data, disabled, onPageChange }: UserRecordsPaginationProps) => (
  <nav aria-label={data.label} className={s.pagination}>
    <span aria-live="polite">{data.totalLabel}</span>
    <div className={s.controls}>
      <Button
        disabled={disabled || !data.canGoPrevious}
        onClick={() => onPageChange(data.previousOffset)}
        size="sm"
        type="button"
        variant="outline"
      >
        {data.previousLabel}
      </Button>
      <span>{data.pageLabel}</span>
      <Button
        disabled={disabled || !data.canGoNext}
        onClick={() => onPageChange(data.nextOffset)}
        size="sm"
        type="button"
        variant="outline"
      >
        {data.nextLabel}
      </Button>
    </div>
  </nav>
);
