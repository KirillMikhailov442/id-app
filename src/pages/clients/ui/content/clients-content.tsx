import { Plus } from "lucide-react";

import type { ClientWithScopes } from "@entities/client";
import type { Scope } from "@entities/scope";

import { useModalPresence } from "@shared/modal";

import { Button } from "@id-app/shadcn";

import { ClientsModel } from "../../model/clients.model";
import type { ClientsContentData } from "../../types";
import { ClientEditor } from "../client-editor";
import { ClientsEmpty } from "../clients-empty";
import { ClientsPagination } from "../clients-pagination";
import { ClientsTable } from "../clients-table";
import s from "./clients-content.module.scss";

interface ClientsContentProps {
  content: ClientsContentData;
  editor: ClientWithScopes | null | undefined;
  scopes: Scope[];
  isFetching: boolean;
}

export const ClientsContent = ({ content, editor, scopes, isFetching }: ClientsContentProps) => {
  const { clients } = content;
  const editorPresence = useModalPresence(editor !== undefined, editor);

  return (
    <div className={s.page}>
      <header className={s.header}>
        <div>
          <h1 className={s.title}>{content.title}</h1>
          <p className={s.subtitle}>{content.description}</p>
        </div>
        <Button className={s.create} onClick={() => ClientsModel.openEditor()} type="button">
          <Plus aria-hidden="true" />
          {content.createLabel}
        </Button>
      </header>
      {clients.length === 0 ? (
        <ClientsEmpty />
      ) : (
        <>
          <ClientsTable clients={clients} />
          <ClientsPagination
            disabled={isFetching}
            onPageChange={ClientsModel.setOffset}
            pagination={content.pagination}
          />
        </>
      )}
      {editorPresence.mounted && editorPresence.value !== undefined && (
        <ClientEditor
          key={editorPresence.value?.id ?? "new"}
          client={editorPresence.value}
          onExitComplete={editorPresence.onExitComplete}
          open={editor !== undefined}
          scopes={scopes}
        />
      )}
    </div>
  );
};
