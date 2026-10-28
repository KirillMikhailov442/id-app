import { useTranslation } from "react-i18next";

import type { SessionUser } from "@shared/api";
import { ModalActions, ModalId, ModalTemplate } from "@shared/modal";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@id-app/shadcn";

import { useEditProfileForm } from "../hooks/use-edit-profile-form";
import { EDIT_PROFILE_FIELDS } from "../model/edit-profile.const";
import s from "./edit-profile.module.scss";

interface EditProfileFormProps {
  user: SessionUser;
  onClose: () => void;
  onExitComplete: () => void;
}

export const EditProfileForm = ({ user, onClose, onExitComplete }: EditProfileFormProps) => {
  const { t } = useTranslation();
  const { form, handleSubmit, isSubmitting } = useEditProfileForm(user, onClose);

  return (
    <ModalTemplate
      applyLoading={isSubmitting}
      description={t("profile.edit.description")}
      hideFooter
      id={ModalId.ProfileEdit}
      onExitComplete={onExitComplete}
      size="s"
      title={t("profile.edit.title")}
    >
      <Form {...form}>
        <form className={s.form} noValidate onSubmit={handleSubmit}>
          <fieldset className={s.fields} disabled={isSubmitting}>
            {EDIT_PROFILE_FIELDS.map(({ name, label, ...inputProps }) => (
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
            <Button disabled={isSubmitting} onClick={onClose} type="button" variant="outline">
              {t("profile.edit.cancel")}
            </Button>
            <Button disabled={isSubmitting || !form.formState.isDirty} type="submit">
              {t(isSubmitting ? "profile.edit.saving" : "profile.edit.save")}
            </Button>
          </ModalActions>
        </form>
      </Form>
    </ModalTemplate>
  );
};
