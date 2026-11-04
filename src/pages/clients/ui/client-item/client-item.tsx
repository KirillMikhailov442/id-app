import { useTranslation } from "react-i18next";

import type { Client } from "@entities/client";

import { Switch } from "@id-app/shadcn";

import { useClientActions } from "../../hooks/use-client-actions";
import { ClientActionsMenu } from "../client-actions-menu";
import s from "./client-item.module.scss";

interface ClientItemProps {
  client: Client;
}

export const ClientItem = ({ client }: ClientItemProps) => {
  const { t } = useTranslation();
  const { toggle, isPending } = useClientActions(client);

  return (
    <tr className={client.isActive ? undefined : s.disabled}>
      <td>
        <span className={s.name} title={client.name}>
          {client.name}
        </span>
      </td>
      <td>
        <code className={s.uri} title={client.location ?? undefined}>
          {client.location ?? t("clients.noLocation")}
        </code>
      </td>
      <td>
        <div className={s.scopes}>
          {client.scopes.map((scope) => (
            <span key={scope} className={s.scope}>
              {scope}
            </span>
          ))}
        </div>
      </td>
      <td>
        <label className={s.status}>
          <Switch checked={client.isActive} disabled={isPending} onCheckedChange={() => void toggle()} />
          <span>{t(client.isActive ? "clients.enabled" : "clients.disabled")}</span>
        </label>
      </td>
      <td className={s.actionCell}>
        <ClientActionsMenu client={client} />
      </td>
    </tr>
  );
};
