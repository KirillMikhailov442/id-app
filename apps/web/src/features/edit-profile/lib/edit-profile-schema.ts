import type { TFunction } from "i18next";
import { z } from "zod";

import { MAX_NAME_LENGTH, MAX_SURNAME_LENGTH, MIN_NAME_LENGTH, MIN_SURNAME_LENGTH } from "@entities/user";

import { PROFILE_EMAIL_MAX_LENGTH } from "../model/edit-profile.const";

export const createEditProfileSchema = (t: TFunction) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(MIN_NAME_LENGTH, t("register.validation.minLength", { min: MIN_NAME_LENGTH }))
      .max(MAX_NAME_LENGTH, t("register.validation.maxLength", { max: MAX_NAME_LENGTH })),
    surname: z
      .string()
      .trim()
      .min(MIN_SURNAME_LENGTH, t("register.validation.minLength", { min: MIN_SURNAME_LENGTH }))
      .max(MAX_SURNAME_LENGTH, t("register.validation.maxLength", { max: MAX_SURNAME_LENGTH })),
    email: z
      .string()
      .trim()
      .max(PROFILE_EMAIL_MAX_LENGTH, t("register.validation.maxLength", { max: PROFILE_EMAIL_MAX_LENGTH }))
      .pipe(z.email(t("register.validation.email"))),
  });
