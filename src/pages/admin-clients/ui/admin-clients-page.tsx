import { useTranslation } from "react-i18next";

import { Button } from "@id-app/shadcn";

import { useAdminClientList } from "../hooks/use-admin-client-list";
import s from "./admin-clients.module.scss";
import { ClientsEmpty } from "./clients-empty/clients-empty";
import { ClientsPagination } from "./clients-pagination/clients-pagination";
import { ClientsSearch } from "./clients-search/clients-search";
import { ClientsTable } from "./clients-table/clients-table";

export const AdminClientsPage = () => {
  const { t } = useTranslation();
  const { query, search, debouncedSearch, setSearch, isPageOutOfRange } = useAdminClientList();

  return (
    <section aria-labelledby="admin-clients-title" className={s.page}>
      <header>
        <h1 className={s.title} id="admin-clients-title">
          {t("adminClients.title")}
        </h1>
        <p className={s.description}>{t("adminClients.description")}</p>
      </header>
      <ClientsSearch onChange={setSearch} value={search} />
      {query.isError ? (
        <div className={s.error} role="alert">
          <p>{t("adminClients.loadError")}</p>
          <Button disabled={query.isFetching} onClick={() => void query.refetch()} type="button" variant="outline">
            {t("adminClients.retry")}
          </Button>
        </div>
      ) : query.isSuccess && !isPageOutOfRange && query.data.items.length === 0 ? (
        <ClientsEmpty isSearch={debouncedSearch.length > 0} />
      ) : (
        <>
          <ClientsTable
            clients={query.data?.items ?? []}
            isFetching={query.isFetching}
            loading={query.isPending || isPageOutOfRange}
          />
          {query.data !== undefined && !isPageOutOfRange && (
            <ClientsPagination disabled={query.isFetching} meta={query.data.meta} />
          )}
        </>
      )}
    </section>
  );
};
