import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@id-app/shadcn";

import { useClients } from "../hooks/use-clients";
import { mapClientsContent } from "../lib/map-clients-content";
import { ClientsModel } from "../model/clients.model";
import { ClientsModals } from "./clients-modals";
import s from "./clients-page.module.scss";
import { ClientsContent } from "./content/clients-content";

export const ClientsPage = () => {
  const { t } = useTranslation();
  const { clientsQuery, scopesQuery, refetch, isPageOutOfRange } = useClients();
  const isReady = clientsQuery.isSuccess && scopesQuery.isSuccess && !isPageOutOfRange;
  const content = isReady ? mapClientsContent(clientsQuery.data, t) : undefined;

  return (
    <section aria-labelledby="clients-title" className={s.page}>
      <header className={s.header}>
        <div>
          <h1 className={s.title} id="clients-title">
            {t("clients.title")}
          </h1>
          <p className={s.subtitle}>{t("clients.description")}</p>
        </div>
        <Button className={s.create} disabled={!isReady} onClick={() => ClientsModel.openEditor()} type="button">
          <Plus aria-hidden="true" />
          {t("clients.create")}
        </Button>
      </header>
      <ClientsContent
        content={content}
        isError={clientsQuery.isError || scopesQuery.isError}
        isFetching={clientsQuery.isFetching}
        isRetrying={clientsQuery.isFetching || scopesQuery.isFetching}
        onRetry={() => void refetch()}
      />
      {isReady && <ClientsModals scopes={scopesQuery.data} />}
    </section>
  );
};
