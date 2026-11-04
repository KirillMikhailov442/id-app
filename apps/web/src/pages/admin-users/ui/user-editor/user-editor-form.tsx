import { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";

import type { SessionUser } from "@shared/api";
import { ModalActions } from "@shared/modal";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@id-app/shadcn";

import { useAdminUserForm } from "../../hooks/use-admin-user-form";
import { ADMIN_USER_FIELDS } from "../../model/admin-users.const";
import { AdminUsersModel } from "../../model/admin-users.model";
import s from "./user-editor.module.scss";

interface UserEditorFormProps {
  user: SessionUser;
  setDismissDisabled: (disabled: boolean) => void;
}

export const UserEditorForm = ({ user, setDismissDisabled }: UserEditorFormProps) => {
  const { t } = useTranslation();
  const { form, handleSubmit, isSubmitting } = useAdminUserForm(user);

  useLayoutEffect(() => {
    setDismissDisabled(isSubmitting);

    return () => setDismissDisabled(false);
  }, [isSubmitting, setDismissDisabled]);

  return (
    <Form {...form}>
      <form className={s.form} noValidate onSubmit={handleSubmit}>
        <fieldset className={s.fields} disabled={isSubmitting}>
          {ADMIN_USER_FIELDS.map(({ name, label, ...inputProps }) => (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t(label)}</FormLabel>
                  <FormControl>
                    <Input {...inputProps} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </fieldset>
        {form.formState.errors.root?.message !== undefined && (
          <p className={s.error} role="alert">
            {form.formState.errors.root.message}
          </p>
        )}
        <ModalActions>
          <Button disabled={isSubmitting} onClick={AdminUsersModel.closeEditor} type="button" variant="outline">
            {t("modal.cancel")}
          </Button>
          <Button disabled={isSubmitting || !form.formState.isDirty} type="submit">
            {t(isSubmitting ? "profile.edit.saving" : "profile.edit.save")}
          </Button>
        </ModalActions>
      </form>
    </Form>
  );
};
