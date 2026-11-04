import { useTranslation } from "react-i18next";

import type { Client } from "@entities/client";
import type { Scope } from "@entities/scope";

import { ModalActions, ResponsiveModal } from "@shared/modal";

import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@id-app/shadcn";

import { useClientForm } from "../../hooks/use-client-form";
import {
  CLIENT_LOCATION_MAX_LENGTH,
  CLIENT_NAME_MAX_LENGTH,
  CLIENT_SECRET_MAX_LENGTH,
} from "../../model/clients.const";
import { ClientsModel } from "../../model/clients.model";
import { ClientScopesField } from "../client-scopes-field";
import s from "./client-editor.module.scss";

interface ClientEditorProps {
  client: Client | null;
  open: boolean;
  onExitComplete: () => void;
  scopes: Scope[];
}

export const ClientEditor = ({ client, open, onExitComplete, scopes }: ClientEditorProps) => {
  const { t } = useTranslation();
  const { form, handleSubmit, isSubmitting } = useClientForm(client, scopes);

  return (
    <ResponsiveModal
      description={t("clients.formDescription")}
      onClose={() => {
        if (!isSubmitting) ClientsModel.closeEditor();
      }}
      onExitComplete={onExitComplete}
      open={open}
      title={t(client === null ? "clients.createTitle" : "clients.editTitle")}
    >
      <Form {...form}>
        <form className={s.form} noValidate onSubmit={handleSubmit}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("clients.name")}</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="off" disabled={isSubmitting} maxLength={CLIENT_NAME_MAX_LENGTH} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {client === null && (
            <FormField
              control={form.control}
              name="secret"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("clients.secret")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="new-password"
                      disabled={isSubmitting}
                      maxLength={CLIENT_SECRET_MAX_LENGTH}
                      type="password"
                    />
                  </FormControl>
                  <FormDescription>{t("clients.secretHint")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("clients.location")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoCapitalize="none"
                    autoComplete="off"
                    disabled={isSubmitting}
                    maxLength={CLIENT_LOCATION_MAX_LENGTH}
                    spellCheck={false}
                    type="url"
                  />
                </FormControl>
                <FormDescription>{t("clients.locationHint")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <ClientScopesField control={form.control} disabled={isSubmitting} scopes={scopes} />
          {form.formState.errors.root?.message !== undefined && (
            <p className={s.error} role="alert">
              {form.formState.errors.root.message}
            </p>
          )}
          <ModalActions>
            <Button disabled={isSubmitting} onClick={ClientsModel.closeEditor} type="button" variant="outline">
              {t("modal.cancel")}
            </Button>
            <Button disabled={isSubmitting} type="submit">
              {t(client === null ? "clients.create" : "clients.save")}
            </Button>
          </ModalActions>
        </form>
      </Form>
    </ResponsiveModal>
  );
};
