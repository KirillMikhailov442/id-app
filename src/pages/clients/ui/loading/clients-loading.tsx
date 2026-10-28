import { useTranslation } from "react-i18next";

import { Skeleton } from "@id-app/shadcn";

import { CLIENTS_SKELETON_COLUMNS, CLIENTS_SKELETON_ROWS } from "../../model/clients.const";
import s from "./clients-loading.module.scss";

export const ClientsLoading = () => {
  const { t } = useTranslation();

  return (
    <section aria-busy="true" aria-label={t("clients.loading")} className={s.page} role="status">
      <div aria-hidden="true" className={s.header}>
        <div className={s.information}>
          <Skeleton className={s.title} />
          <Skeleton className={s.description} />
        </div>
        <Skeleton className={s.create} />
      </div>
      <div aria-hidden="true" className={s.tableWrapper}>
        <div className={s.table}>
          <div className={s.heading}>
            {CLIENTS_SKELETON_COLUMNS.map((column) => (
              <Skeleton key={column} className={s.label} />
            ))}
          </div>
          {CLIENTS_SKELETON_ROWS.map((row) => (
            <div key={row} className={s.row}>
              <Skeleton className={s.name} />
              <Skeleton className={s.uri} />
              <div className={s.scopes}>
                <Skeleton className={s.scope} />
                <Skeleton className={s.scope} />
              </div>
              <Skeleton className={s.status} />
              <Skeleton className={s.action} />
            </div>
          ))}
        </div>
      </div>
      <Skeleton aria-hidden="true" className={s.notice} />
    </section>
  );
};
