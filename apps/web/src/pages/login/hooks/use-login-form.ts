import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { AuthSessionService } from "@features/auth-session";

import { useLogin } from "@entities/auth";

import { getApiErrorCode } from "@shared/api";
import { AppRoute } from "@shared/config";

import { toast } from "@id-app/shadcn";

import { createLoginSchema, type LoginFormValues } from "../lib/login-schema";
import { INVALID_CREDENTIALS_CODE, LOGIN_FORM_DEFAULT_VALUES } from "../model/login.const";

export const useLoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const login = useLogin({
    onError: (error) => {
      toast.error(
        t(getApiErrorCode(error) === INVALID_CREDENTIALS_CODE ? "login.invalidCredentials" : "login.serverUnavailable")
      );
    },
    onSuccess: async ({ accessToken }) => {
      await AuthSessionService.completeLogin(accessToken);
      await navigate({ to: AppRoute.Main });
    },
  });

  const loginSchema = useMemo(() => createLoginSchema(t), [t]);
  const form = useForm<LoginFormValues>({
    defaultValues: LOGIN_FORM_DEFAULT_VALUES,
    resolver: zodResolver(loginSchema),
  });

  const handleSubmit = form.handleSubmit((values) => {
    if (!login.isPending) {
      login.mutate(values);
    }
  });

  return { form, isSubmitting: login.isPending, handleSubmit };
};
