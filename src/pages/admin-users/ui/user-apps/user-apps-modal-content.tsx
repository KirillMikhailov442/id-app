import { useTranslation } from "react-i18next";

import { useUserApps } from "../../hooks/use-user-apps";
import { mapUserRecordsContent } from "../../lib/map-user-records-content";
import { UserRecordsPagination } from "../user-records-pagination/user-records-pagination";
import { UserAppsLoadError } from "./user-apps-load-error";
import { UserAppsTable } from "./user-apps-table";
import s from "./user-apps.module.scss";

interface UserAppsModalContentProps {
  userId: string;
  open: boolean;
}

export const UserAppsModalContent = ({ userId, open }: UserAppsModalContentProps) => {
  const { t } = useTranslation();
  const { query, isPageOutOfRange, setOffset } = useUserApps(userId, open);
  const content = mapUserRecordsContent(query.data, "apps", t);
  const loading = query.isPending || isPageOutOfRange;

  if (query.isError) {
    return <UserAppsLoadError isFetching={query.isFetching} onRetry={() => void query.refetch()} />;
  }

  if (!loading && content?.items.length === 0) {
    return <p className={s.state}>{t("adminUsers.apps.empty")}</p>;
  }

  return (
    <>
      <UserAppsTable apps={content?.items ?? []} isFetching={query.isFetching} loading={loading} />
      {content !== undefined && !isPageOutOfRange && (
        <UserRecordsPagination data={content.pagination} disabled={query.isFetching} onPageChange={setOffset} />
      )}
    </>
  );
};
