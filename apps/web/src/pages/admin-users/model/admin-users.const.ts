import { MAX_NAME_LENGTH, MAX_SURNAME_LENGTH } from "@entities/user";

export const ADMIN_USERS_PAGE_SIZE = 20;
export const ADMIN_USERS_SEARCH_DEBOUNCE_MS = 300;
export const ADMIN_USERS_INITIAL_OFFSET = 0;
export const ADMIN_USER_EMAIL_MAX_LENGTH = 128;
export const ADMIN_USER_EMAIL_REGISTERED_CODE = "EMAIL_ALREADY_REGISTERED";
export const ADMIN_USERS_SKELETON_ROWS = ["first", "second", "third"] as const;
export const ADMIN_USER_DETAIL_FIELDS = ["id", "name", "surname", "email"] as const;
export const ADMIN_USER_DETAIL_DATES = ["createdAt", "updatedAt"] as const;

export const ADMIN_USERS_COLUMNS = [
  "avatar",
  "name",
  "surname",
  "email",
  "roles",
  "emailStatus",
  "blockedStatus",
  "createdAt",
  "actions",
] as const;

export const ADMIN_USER_FIELDS = [
  { name: "name", label: "profile.name", autoComplete: "given-name", type: "text", maxLength: MAX_NAME_LENGTH },
  {
    name: "surname",
    label: "profile.surname",
    autoComplete: "family-name",
    type: "text",
    maxLength: MAX_SURNAME_LENGTH,
  },
  {
    name: "email",
    label: "profile.email",
    autoComplete: "email",
    type: "email",
    maxLength: ADMIN_USER_EMAIL_MAX_LENGTH,
  },
] as const;
