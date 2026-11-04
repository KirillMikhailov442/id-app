import { useTranslation } from "react-i18next";

import type { Client } from "@entities/client";

import { formatDate } from "@shared/lib";

import { Badge } from "@id-app/shadcn";

import { ClientActionsMenu } from "../client-actions-menu/client-actions-menu";
import s from "./client-row.module.scss";

interface ClientRowProps {
  client: Client;
}

export const ClientRow = ({ client }: ClientRowProps) => {
  const { t, i18n } = useTranslation();

  return (
    <tr>
      <td title={client.name}>{client.name}</td>
      <td className={s.id} title={client.id}>
        {client.id}
      </td>
      <td>
        <Badge className={s.badge} variant={client.isActive ? "secondary" : "outline"}>
          {t(client.isActive ? "adminClients.active" : "adminClients.inactive")}
        </Badge>
      </td>
      <td>
        <time dateTime={client.createdAt}>
          {formatDate(client.createdAt, { language: i18n.language, fallback: t("profile.unavailable") })}
        </time>
      </td>
      <td className={s.actions}>
        <ClientActionsMenu client={client} />
      </td>
    </tr>
  );
};
