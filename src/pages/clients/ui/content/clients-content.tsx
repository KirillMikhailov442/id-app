import { ClientsModel } from "../../model/clients.model";
import type { ClientsContentData } from "../../types";
import { ClientsEmpty } from "../clients-empty";
import { ClientsPagination } from "../clients-pagination";
import { ClientsTable } from "../clients-table";
import { ClientsError } from "../error/clients-error";
import { ClientsLoading } from "../loading/clients-loading";

interface ClientsContentProps {
  content: ClientsContentData | undefined;
  isError: boolean;
  isFetching: boolean;
  isRetrying: boolean;
  onRetry: () => void;
}

export const ClientsContent = ({ content, isError, isFetching, isRetrying, onRetry }: ClientsContentProps) => {
  if (isError) {
    return <ClientsError isRetrying={isRetrying} onRetry={onRetry} />;
  }

  if (content === undefined) {
    return <ClientsLoading />;
  }

  if (content.clients.length === 0) {
    return <ClientsEmpty />;
  }

  return (
    <>
      <ClientsTable clients={content.clients} />
      <ClientsPagination disabled={isFetching} onPageChange={ClientsModel.setOffset} pagination={content.pagination} />
    </>
  );
};
