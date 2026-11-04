import { useTranslation } from "react-i18next";

import type { Scope } from "@entities/scope";

import { ModalId, ResponsiveModal } from "@shared/modal";

import { ClientEditorForm } from "./client-editor-form";

interface ClientEditorProps {
  scopes: Scope[];
}

export const ClientEditor = ({ scopes }: ClientEditorProps) => {
  const { t } = useTranslation();

  return (
    <ResponsiveModal id={ModalId.ClientEdit} requiredParams>
      {({ params }, setDismissDisabled) => ({
        title: t(params === null ? "clients.createTitle" : "clients.editTitle"),
        description: t("clients.formDescription"),
        children: (
          <ClientEditorForm
            key={params?.id ?? "new"}
            client={params}
            scopes={scopes}
            setDismissDisabled={setDismissDisabled}
          />
        ),
      })}
    </ResponsiveModal>
  );
};
