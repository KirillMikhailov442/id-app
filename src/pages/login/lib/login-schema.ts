import type { TFunction } from "i18next";
import { z } from "zod";

import { MIN_PASSWORD_LENGTH, PASSWORD_PATTERN } from "@entities/user";

export const createLoginSchema = (t: TFunction) =>
  z.object({
    email: z
      .string({ error: t("login.validation.emailRequired") })
      .nonempty(t("login.validation.emailRequired"))
      .pipe(z.email(t("login.validation.email"))),
    password: z
      .string({ error: t("login.validation.passwordRequired") })
      .nonempty(t("login.validation.passwordRequired"))
      .min(MIN_PASSWORD_LENGTH, t("login.validation.passwordMinLength", { min: MIN_PASSWORD_LENGTH }))
      .regex(PASSWORD_PATTERN, t("login.validation.passwordPattern")),
  });

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;
