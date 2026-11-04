import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useUpdateUser, type UpdateProfileRequest } from "@entities/user";

import { getApiErrorCode, type SessionUser } from "@shared/api";

import { toast } from "@id-app/shadcn";

import { createAdminUserSchema } from "../lib/admin-user-schema";
import { ADMIN_USER_EMAIL_REGISTERED_CODE } from "../model/admin-users.const";
import { AdminUsersModel } from "../model/admin-users.model";

export const useAdminUserForm = (user: SessionUser) => {
  const { t } = useTranslation();
  const schema = useMemo(() => createAdminUserSchema(t), [t]);
  const mutation = useUpdateUser();
  const form = useForm<UpdateProfileRequest>({
    resolver: zodResolver(schema),
    defaultValues: { name: user.name, surname: user.surname, email: user.email },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    form.clearErrors("root");

    try {
      await mutation.mutateAsync({ id: user.id, data });
      AdminUsersModel.closeEditor();
      toast.success(t("adminUsers.saved"));
    } catch (error) {
      if (getApiErrorCode(error) === ADMIN_USER_EMAIL_REGISTERED_CODE) {
        form.setError(
          "email",
          { type: "server", message: t("register.validation.emailAlreadyRegistered") },
          { shouldFocus: true }
        );

        return;
      }

      form.setError("root", { message: t("adminUsers.actionError") });
    }
  });

  return { form, handleSubmit, isSubmitting: form.formState.isSubmitting };
};
