export const USER_SESSIONS_PAGE_SIZE = 10;
export const USER_SESSIONS_INITIAL_OFFSET = 0;
export const USER_SESSIONS_COLUMNS = [
  "id",
  "browser",
  "os",
  "deviceType",
  "ip",
  "createdAt",
  "lastUsedAt",
  "expiresAt",
  "status",
  "actions",
] as const;
export const USER_SESSION_DATE_FIELDS = ["createdAt", "lastUsedAt", "expiresAt"] as const;
