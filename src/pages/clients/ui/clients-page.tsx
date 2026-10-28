import { useTranslation } from "react-i18next";

import { useClients } from "../hooks/use-clients";
import { mapClientsContent } from "../lib/map-clients-content";
import { ClientsContent } from "./content/clients-content";
import { ClientsError } from "./error/clients-error";
import { ClientsLoading } from "./loading/clients-loading";

export const ClientsPage = () => {
  const { t } = useTranslation();
  const { clientsQuery, scopesQuery, editor, refetch, isPageOutOfRange } = useClients();

  if (clientsQuery.isError || scopesQuery.isError) {
    return (
      <ClientsError isRetrying={clientsQuery.isFetching || scopesQuery.isFetching} onRetry={() => void refetch()} />
    );
  }

  if (clientsQuery.isPending || scopesQuery.isPending || isPageOutOfRange) {
    return <ClientsLoading />;
  }

  const content = mapClientsContent(clientsQuery.data, t);

  return (
    <ClientsContent content={content} editor={editor} isFetching={clientsQuery.isFetching} scopes={scopesQuery.data} />
  );
};
