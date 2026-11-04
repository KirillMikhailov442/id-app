import { useTranslation } from "react-i18next";

import type { Client } from "@entities/client";

import { ClientItem } from "../client-item";
import s from "./clients-table.module.scss";

interface ClientsTableProps {
  clients: Client[];
}

export const ClientsTable = ({ clients }: ClientsTableProps) => {
  const { t } = useTranslation();

  return (
    <div aria-label={t("clients.listLabel")} className={s.tableWrapper} role="region" tabIndex={0}>
      <table aria-label={t("clients.listLabel")} className={s.table}>
        <colgroup>
          <col className={s.nameColumn} />
          <col className={s.uriColumn} />
          <col />
          <col className={s.statusColumn} />
          <col className={s.actionsColumn} />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">{t("clients.name")}</th>
            <th scope="col">{t("clients.location")}</th>
            <th scope="col">Scopes</th>
            <th scope="col">{t("clients.status")}</th>
            <th scope="col">
              <span className={s.visuallyHidden}>{t("clients.actions")}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <ClientItem key={client.id} client={client} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
