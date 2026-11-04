import { useTranslation } from "react-i18next";

import type { Client } from "@entities/client";

import { Skeleton } from "@id-app/shadcn";

import { ADMIN_CLIENTS_COLUMNS, ADMIN_CLIENTS_SKELETON_ROWS } from "../../model/admin-clients.const";
import { ClientRow } from "../client-row/client-row";
import s from "./clients-table.module.scss";

interface ClientsTableProps {
  clients: Client[];
  loading?: boolean;
  isFetching?: boolean;
}

export const ClientsTable = ({ clients, loading = false, isFetching = false }: ClientsTableProps) => {
  const { t } = useTranslation();

  return (
    <div aria-label={t("adminClients.title")} className={s.wrapper} role="region" tabIndex={0}>
      <table aria-busy={loading || isFetching} aria-label={t("adminClients.title")} className={s.table}>
        <thead>
          <tr>
            {ADMIN_CLIENTS_COLUMNS.map((column) => (
              <th key={column} scope="col">
                {t(`adminClients.columns.${column}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading
            ? ADMIN_CLIENTS_SKELETON_ROWS.map((row) => (
                <tr key={row}>
                  {ADMIN_CLIENTS_COLUMNS.map((column) => (
                    <td key={column}>
                      <Skeleton className={s.skeleton} />
                    </td>
                  ))}
                </tr>
              ))
            : clients.map((client) => <ClientRow key={client.id} client={client} />)}
        </tbody>
      </table>
    </div>
  );
};
