import { useTranslation } from "react-i18next";

import { useAdminUsers } from "../hooks/use-admin-users";
import { AdminUsersModals } from "./admin-users-modals";
import { AdminUsersPageContent } from "./admin-users-page-content";
import s from "./admin-users.module.scss";
import { UsersSearch } from "./users-search/users-search";

export const AdminUsersPage = () => {
  const { t } = useTranslation();
  const { query, editor, details, sessionsUser, appsUser, search, debouncedSearch, setSearch, isPageOutOfRange } =
    useAdminUsers();

  return (
    <section aria-labelledby="admin-users-title" className={s.page}>
      <header>
        <h1 className={s.title} id="admin-users-title">
          {t("adminUsers.title")}
        </h1>
        <p className={s.description}>{t("adminUsers.description")}</p>
      </header>
      <UsersSearch onChange={setSearch} value={search} />
      <AdminUsersPageContent
        isError={query.isError}
        isFetching={query.isFetching}
        isPageOutOfRange={isPageOutOfRange}
        isPending={query.isPending}
        isSearch={debouncedSearch.length > 0}
        onRetry={() => void query.refetch()}
        pagination={query.data?.meta}
        users={query.data?.items}
      />
      <AdminUsersModals appsUser={appsUser} details={details} editor={editor} sessionsUser={sessionsUser} />
    </section>
  );
};
