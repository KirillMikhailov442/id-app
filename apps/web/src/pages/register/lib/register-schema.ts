import type { TFunction } from "i18next";
import { z } from "zod";

import {
  MAX_EMAIL_LENGTH,
  MAX_NAME_LENGTH,
  MAX_PASSWORD_LENGTH,
  MAX_SURNAME_LENGTH,
  MIN_EMAIL_LENGTH,
  MIN_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_SURNAME_LENGTH,
  PASSWORD_PATTERN,
} from "@entities/user";

export const createRegisterSchema = (t: TFunction) =>
  z.object({
    name: z
      .string({ error: t("register.validation.firstName") })
      .trim()
      .min(MIN_NAME_LENGTH, t("register.validation.minLength", { min: MIN_NAME_LENGTH }))
      .max(MAX_NAME_LENGTH, t("register.validation.maxLength", { max: MAX_NAME_LENGTH })),
    surname: z
      .string({ error: t("register.validation.lastName") })
      .trim()
      .min(MIN_SURNAME_LENGTH, t("register.validation.minLength", { min: MIN_SURNAME_LENGTH }))
      .max(MAX_SURNAME_LENGTH, t("register.validation.maxLength", { max: MAX_SURNAME_LENGTH })),
    email: z
      .string({ error: t("register.validation.email") })
      .trim()
      .min(MIN_EMAIL_LENGTH, t("register.validation.minLength", { min: MIN_EMAIL_LENGTH }))
      .max(MAX_EMAIL_LENGTH, t("register.validation.maxLength", { max: MAX_EMAIL_LENGTH }))
      .pipe(z.email(t("register.validation.email"))),
    password: z
      .string({ error: t("register.validation.passwordPattern") })
      .min(MIN_PASSWORD_LENGTH, t("register.validation.minLength", { min: MIN_PASSWORD_LENGTH }))
      .max(MAX_PASSWORD_LENGTH, t("register.validation.maxLength", { max: MAX_PASSWORD_LENGTH }))
      .regex(PASSWORD_PATTERN, t("register.validation.passwordPattern")),
  });
