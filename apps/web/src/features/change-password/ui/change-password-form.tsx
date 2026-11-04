import { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";

import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "@entities/user";

import { ModalActions } from "@shared/modal";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@id-app/shadcn";

import { useChangePasswordForm } from "../hooks/use-change-password-form";
import { CHANGE_PASSWORD_FIELDS } from "../model/change-password.const";
import s from "./change-password.module.scss";

interface ChangePasswordFormProps {
  close: () => void;
  setDismissDisabled: (disabled: boolean) => void;
}

export const ChangePasswordForm = ({ close, setDismissDisabled }: ChangePasswordFormProps) => {
  const { t } = useTranslation();
  const { form, handleSubmit, isSubmitting } = useChangePasswordForm(close);

  useLayoutEffect(() => {
    setDismissDisabled(isSubmitting);

    return () => setDismissDisabled(false);
  }, [isSubmitting, setDismissDisabled]);

  return (
    <Form {...form}>
      <form className={s.form} noValidate onSubmit={handleSubmit}>
        {CHANGE_PASSWORD_FIELDS.map(({ name, label, autoComplete }) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t(label)}</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete={autoComplete} disabled={isSubmitting} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <p className={s.hint}>{t("register.passwordHint", { min: MIN_PASSWORD_LENGTH, max: MAX_PASSWORD_LENGTH })}</p>
        <ModalActions>
          <Button disabled={isSubmitting} onClick={close} type="button" variant="outline">
            {t("modal.cancel")}
          </Button>
          <Button disabled={isSubmitting} type="submit">
            {t(isSubmitting ? "security.password.saving" : "security.password.save")}
          </Button>
        </ModalActions>
      </form>
    </Form>
  );
};
