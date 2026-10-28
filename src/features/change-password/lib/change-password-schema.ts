import type { TFunction } from "i18next";
import { z } from "zod";

import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH, PASSWORD_PATTERN } from "@entities/user";

export const createChangePasswordSchema = (t: TFunction) =>
  z
    .object({
      currentPassword: z.string().min(1, t("login.validation.passwordRequired")),
      newPassword: z
        .string()
        .min(MIN_PASSWORD_LENGTH, t("register.validation.minLength", { min: MIN_PASSWORD_LENGTH }))
        .max(MAX_PASSWORD_LENGTH, t("register.validation.maxLength", { max: MAX_PASSWORD_LENGTH }))
        .regex(PASSWORD_PATTERN, t("register.validation.passwordPattern")),
      confirmPassword: z.string().min(1, t("login.validation.passwordRequired")),
    })
    .refine((values) => values.newPassword === values.confirmPassword, {
      path: ["confirmPassword"],
      message: t("security.password.mismatch"),
    })
    .refine((values) => values.currentPassword !== values.newPassword, {
      path: ["newPassword"],
      message: t("security.password.samePassword"),
    });

export type ChangePasswordFormValues = z.infer<ReturnType<typeof createChangePasswordSchema>>;
