import type { SessionUser } from "@shared/api";
import type { PaginationMeta } from "@shared/types";

import { UsersEmpty } from "./users-empty";
import { UsersLoadError } from "./users-load-error";
import { UsersPagination } from "./users-pagination/users-pagination";
import { UsersTable } from "./users-table/users-table";

interface AdminUsersPageContentProps {
  users: SessionUser[] | undefined;
  pagination: PaginationMeta | undefined;
  isError: boolean;
  isFetching: boolean;
  isPageOutOfRange: boolean;
  isPending: boolean;
  isSearch: boolean;
  onRetry: () => void;
}

export const AdminUsersPageContent = ({
  users,
  pagination,
  isError,
  isFetching,
  isPageOutOfRange,
  isPending,
  isSearch,
  onRetry,
}: AdminUsersPageContentProps) => {
  if (isError) {
    return <UsersLoadError isFetching={isFetching} onRetry={onRetry} />;
  }

  if (isPending || isPageOutOfRange) {
    return <UsersTable isFetching={isFetching} loading users={users ?? []} />;
  }

  if (users?.length === 0) {
    return <UsersEmpty isSearch={isSearch} />;
  }

  return (
    <>
      <UsersTable isFetching={isFetching} loading={false} users={users ?? []} />
      {pagination !== undefined && <UsersPagination disabled={isFetching} meta={pagination} />}
    </>
  );
};
