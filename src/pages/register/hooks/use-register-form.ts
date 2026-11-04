import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { AuthSessionService } from "@features/auth-session";

import { useRegister } from "@entities/auth";

import { getApiErrorCode } from "@shared/api";
import { AppRoute } from "@shared/config";

import { toast } from "@id-app/shadcn";

import { createRegisterSchema } from "../lib/register-schema";
import { EMAIL_ALREADY_REGISTERED_CODE, REGISTER_FORM_DEFAULT_VALUES } from "../model/register.const";
import type { RegisterFormValues } from "../types";

export const useRegisterForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const registerSchema = useMemo(() => createRegisterSchema(t), [t]);
  const form = useForm<RegisterFormValues>({
    defaultValues: REGISTER_FORM_DEFAULT_VALUES,
    resolver: zodResolver(registerSchema),
  });

  const register = useRegister({
    onError: (error) => {
      if (getApiErrorCode(error) === EMAIL_ALREADY_REGISTERED_CODE) {
        form.setError(
          "email",
          { type: "server", message: t("register.validation.emailAlreadyRegistered") },
          { shouldFocus: true }
        );

        return;
      }

      toast.error(t("register.submitError"));
    },
    onSuccess: async (response) => {
      AuthSessionService.completeRegistration(response);
      await navigate({ to: AppRoute.Main });
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    if (!register.isPending) {
      register.mutate({
        name: values.name,
        surname: values.surname,
        email: values.email,
        password: values.password,
      });
    }
  });

  return { form, isSubmitting: register.isPending, handleSubmit };
};
