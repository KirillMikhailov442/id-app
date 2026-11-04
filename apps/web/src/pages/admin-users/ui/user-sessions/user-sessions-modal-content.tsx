import { useTranslation } from "react-i18next";

import type { Session } from "@entities/session";

import type { UserRecordsContent } from "../../types";
import { UserRecordsPagination } from "../user-records-pagination/user-records-pagination";
import { UserSessionsLoadError } from "./user-sessions-load-error";
import { UserSessionsLoading } from "./user-sessions-loading";
import { UserSessionsTable } from "./user-sessions-table";
import s from "./user-sessions.module.scss";

interface UserSessionsModalContentProps {
  content: UserRecordsContent<Session> | undefined;
  isError: boolean;
  isFetching: boolean;
  isPageOutOfRange: boolean;
  isPending: boolean;
  disabled: boolean;
  onRevoke: (session: Session) => Promise<void>;
  onPageChange: (offset: number) => void;
  onRetry: () => void;
}

export const UserSessionsModalContent = ({
  content,
  isError,
  isFetching,
  isPageOutOfRange,
  isPending,
  disabled,
  onRevoke,
  onPageChange,
  onRetry,
}: UserSessionsModalContentProps) => {
  const { t } = useTranslation();

  if (isError) {
    return <UserSessionsLoadError isFetching={isFetching} onRetry={onRetry} />;
  }

  if (isPending || isPageOutOfRange) {
    return <UserSessionsLoading />;
  }

  if (content?.items.length === 0) {
    return <p className={s.state}>{t("adminUsers.sessions.empty")}</p>;
  }

  return (
    <>
      <UserSessionsTable
        disabled={disabled}
        isFetching={isFetching}
        onRevoke={onRevoke}
        sessions={content?.items ?? []}
      />
      {content !== undefined && (
        <UserRecordsPagination data={content.pagination} disabled={disabled} onPageChange={onPageChange} />
      )}
    </>
  );
};
