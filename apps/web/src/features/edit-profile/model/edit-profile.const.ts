import { MAX_NAME_LENGTH, MAX_SURNAME_LENGTH } from "@entities/user";

export const PROFILE_EMAIL_MAX_LENGTH = 128;
export const EMAIL_ALREADY_REGISTERED_CODE = "EMAIL_ALREADY_REGISTERED";

export const EDIT_PROFILE_FIELDS = [
  { name: "name", label: "profile.name", autoComplete: "given-name", type: "text", maxLength: MAX_NAME_LENGTH },
  {
    name: "surname",
    label: "profile.surname",
    autoComplete: "family-name",
    type: "text",
    maxLength: MAX_SURNAME_LENGTH,
  },
  { name: "email", label: "profile.email", autoComplete: "email", type: "email", maxLength: PROFILE_EMAIL_MAX_LENGTH },
] as const;
