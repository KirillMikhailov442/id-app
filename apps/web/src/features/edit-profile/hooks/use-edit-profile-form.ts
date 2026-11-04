import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useUpdateProfile, type UpdateProfileRequest } from "@entities/user";

import { getApiErrorCode, type SessionUser } from "@shared/api";

import { toast } from "@id-app/shadcn";

import { createEditProfileSchema } from "../lib/edit-profile-schema";
import { EMAIL_ALREADY_REGISTERED_CODE } from "../model/edit-profile.const";

export const useEditProfileForm = (user: SessionUser, onClose: () => void) => {
  const { t } = useTranslation();
  const schema = useMemo(() => createEditProfileSchema(t), [t]);

  const form = useForm<UpdateProfileRequest>({
    defaultValues: { name: user.name, surname: user.surname, email: user.email },
    resolver: zodResolver(schema),
  });

  const mutation = useUpdateProfile({
    onSuccess: () => {
      toast.success(t("profile.edit.success"));
      onClose();
    },
    onError: (error) => {
      if (getApiErrorCode(error) === EMAIL_ALREADY_REGISTERED_CODE) {
        form.setError(
          "email",
          { type: "server", message: t("register.validation.emailAlreadyRegistered") },
          { shouldFocus: true }
        );

        return;
      }

      form.setError("root", { message: t("profile.edit.error") });
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    if (!mutation.isPending) {
      form.clearErrors("root");
      mutation.mutate(values);
    }
  });

  return { form, handleSubmit, isSubmitting: mutation.isPending };
};
