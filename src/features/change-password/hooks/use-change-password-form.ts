import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useChangePassword } from "@entities/user";

import { getApiErrorCode } from "@shared/api";

import { toast } from "@id-app/shadcn";

import { createChangePasswordSchema, type ChangePasswordFormValues } from "../lib/change-password-schema";
import { CHANGE_PASSWORD_DEFAULT_VALUES, INVALID_OLD_PASSWORD_CODE } from "../model/change-password.const";

export const useChangePasswordForm = (onSuccess: () => void) => {
  const { t } = useTranslation();
  const schema = useMemo(() => createChangePasswordSchema(t), [t]);
  const form = useForm<ChangePasswordFormValues>({
    defaultValues: CHANGE_PASSWORD_DEFAULT_VALUES,
    resolver: zodResolver(schema),
  });
  const mutation = useChangePassword({
    onSuccess: () => {
      form.reset();
      toast.success(t("security.password.success"));
      onSuccess();
    },
    onError: (error) => {
      if (getApiErrorCode(error) === INVALID_OLD_PASSWORD_CODE) {
        form.setError(
          "currentPassword",
          { type: "server", message: t("security.password.invalidCurrent") },
          { shouldFocus: true }
        );

        return;
      }

      toast.error(t("security.password.error"));
    },
  });
  const handleSubmit = form.handleSubmit(({ currentPassword, newPassword }) => {
    if (!mutation.isPending) {
      form.clearErrors();
      mutation.mutate({ oldPassword: currentPassword, newPassword });
    }
  });

  return { form, handleSubmit, isSubmitting: mutation.isPending };
};
