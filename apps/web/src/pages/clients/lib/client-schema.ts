import type { TFunction } from "i18next";
import { z } from "zod";

import {
  CLIENT_ALLOWED_PROTOCOLS,
  CLIENT_LOCATION_MAX_LENGTH,
  CLIENT_MAX_SCOPES,
  CLIENT_NAME_MAX_LENGTH,
  CLIENT_NAME_MIN_LENGTH,
  CLIENT_SECRET_MAX_LENGTH,
  CLIENT_SECRET_MIN_LENGTH,
} from "../model/clients.const";

export const createClientSchema = (t: TFunction, availableScopes: string[], isCreating: boolean) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(CLIENT_NAME_MIN_LENGTH, t("clients.validation.name"))
      .max(CLIENT_NAME_MAX_LENGTH, t("register.validation.maxLength", { max: CLIENT_NAME_MAX_LENGTH })),
    secret: z
      .string()
      .refine(
        (value) =>
          !isCreating || (value.length >= CLIENT_SECRET_MIN_LENGTH && value.length <= CLIENT_SECRET_MAX_LENGTH),
        t("clients.validation.secret", { min: CLIENT_SECRET_MIN_LENGTH, max: CLIENT_SECRET_MAX_LENGTH })
      ),
    location: z
      .string()
      .trim()
      .max(CLIENT_LOCATION_MAX_LENGTH, t("register.validation.maxLength", { max: CLIENT_LOCATION_MAX_LENGTH }))
      .refine((value) => {
        if (/\s/.test(value)) {
          return false;
        }

        try {
          const url = new URL(value);

          return (
            CLIENT_ALLOWED_PROTOCOLS.includes(url.protocol) &&
            url.hash.length === 0 &&
            url.username.length === 0 &&
            url.password.length === 0
          );
        } catch {
          return false;
        }
      }, t("clients.validation.location")),
    scopes: z
      .array(z.string())
      .max(CLIENT_MAX_SCOPES, t("clients.validation.maxScopes", { max: CLIENT_MAX_SCOPES }))
      .refine((scopes) => scopes.every((scope) => availableScopes.includes(scope)), t("clients.validation.scopes")),
  });

export type ClientFormValues = z.infer<ReturnType<typeof createClientSchema>>;
