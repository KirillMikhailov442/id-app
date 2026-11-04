import type { Client } from "@entities/client";
import type { Scope } from "@entities/scope";

import { useModal } from "@shared/modal";

import type { ClientCredentials } from "../types";
import { ClientCredentialsModal } from "./client-credentials-modal";
import { ClientEditor } from "./client-editor";

interface ClientsModalsProps {
  editor: Client | null | undefined;
  credentials: ClientCredentials | null;
  scopes: Scope[];
}

export const ClientsModals = ({ editor, credentials, scopes }: ClientsModalsProps) => {
  const editorPresence = useModal({ isOpen: editor !== undefined, params: editor });
  const credentialsPresence = useModal({ isOpen: credentials !== null, params: credentials });

  return (
    <>
      {editorPresence.mounted && editorPresence.params !== undefined && (
        <ClientEditor
          key={editorPresence.params?.id ?? "new"}
          client={editorPresence.params}
          onExitComplete={editorPresence.onExitComplete}
          open={editorPresence.isOpen}
          scopes={scopes}
        />
      )}
      {credentialsPresence.mounted && credentialsPresence.params !== null && (
        <ClientCredentialsModal
          credentials={credentialsPresence.params}
          onExitComplete={credentialsPresence.onExitComplete}
          open={credentialsPresence.isOpen}
        />
      )}
    </>
  );
};
