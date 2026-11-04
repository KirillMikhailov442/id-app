import type { Scope } from "@entities/scope";

import { ClientCredentialsModal } from "./client-credentials-modal";
import { ClientEditor } from "./client-editor";

interface ClientsModalsProps {
  scopes: Scope[];
}

export const ClientsModals = ({ scopes }: ClientsModalsProps) => (
  <>
    <ClientEditor scopes={scopes} />
    <ClientCredentialsModal />
  </>
);
