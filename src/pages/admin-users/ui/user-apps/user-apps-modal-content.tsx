import { useTranslation } from "react-i18next";

import type { OAuthGrant } from "@entities/oauth-grant";

import type { UserRecordsContent } from "../../types";
import { UserRecordsPagination } from "../user-records-pagination/user-records-pagination";
import { UserAppsLoadError } from "./user-apps-load-error";
import { UserAppsTable } from "./user-apps-table";
import s from "./user-apps.module.scss";

interface UserAppsModalContentProps {
  content: UserRecordsContent<OAuthGrant> | undefined;
  isError: boolean;
  isFetching: boolean;
  isPageOutOfRange: boolean;
  isPending: boolean;
  onPageChange: (offset: number) => void;
  onRetry: () => void;
}

export const UserAppsModalContent = ({
  content,
  isError,
  isFetching,
  isPageOutOfRange,
  isPending,
  onPageChange,
  onRetry,
}: UserAppsModalContentProps) => {
  const { t } = useTranslation();
  const loading = isPending || isPageOutOfRange;

  if (isError) {
    return <UserAppsLoadError isFetching={isFetching} onRetry={onRetry} />;
  }

  if (!loading && content?.items.length === 0) {
    return <p className={s.state}>{t("adminUsers.apps.empty")}</p>;
  }

  return (
    <>
      <UserAppsTable apps={content?.items ?? []} isFetching={isFetching} loading={loading} />
      {content !== undefined && !isPageOutOfRange && (
        <UserRecordsPagination data={content.pagination} disabled={isFetching} onPageChange={onPageChange} />
      )}
    </>
  );
};
