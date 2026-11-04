import { useMemo, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useCreateClient, useSetClientScopes, useUpdateClient, type Client } from "@entities/client";
import type { Scope } from "@entities/scope";

import { toast } from "@id-app/shadcn";

import { createClientSchema, type ClientFormValues } from "../lib/client-schema";
import { CLIENT_FORM_DEFAULT_VALUES } from "../model/clients.const";
import { ClientsModel } from "../model/clients.model";

export const useClientForm = (client: Client | null, scopes: Scope[]) => {
  const { t } = useTranslation();
  const createdId = useRef<string | null>(null);
  const schema = useMemo(
    () =>
      createClientSchema(
        t,
        scopes.map(({ name }) => name),
        client === null
      ),
    [t, scopes, client]
  );
  const createClient = useCreateClient();
  const updateClient = useUpdateClient();
  const setClientScopes = useSetClientScopes();
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(schema),
    defaultValues:
      client === null
        ? CLIENT_FORM_DEFAULT_VALUES
        : {
            name: client.name,
            location: client.location ?? "",
            scopes: client.scopes,
            secret: "",
          },
  });

  const handleSubmit = form.handleSubmit(async ({ scopes: selectedScopes, secret, ...data }) => {
    form.clearErrors("root");

    let clientSaved = false;

    try {
      let id = client?.id ?? createdId.current;

      if (id === null) {
        const created = await createClient.mutateAsync({ ...data, secret });
        id = created.id;
        createdId.current = id;
      } else {
        await updateClient.mutateAsync({ id, data });
      }

      clientSaved = true;
      await setClientScopes.mutateAsync({ id, scopes: selectedScopes });
      ClientsModel.closeEditor();

      if (client === null) {
        ClientsModel.openCredentials({ id, secret });
      } else {
        toast.success(t("clients.saved"));
      }
    } catch {
      form.setError("root", { message: t(clientSaved ? "clients.scopesSaveError" : "clients.actionError") });
    }
  });

  return { form, handleSubmit, isSubmitting: form.formState.isSubmitting };
};
