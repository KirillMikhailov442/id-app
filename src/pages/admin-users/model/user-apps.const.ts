export const USER_APPS_PAGE_SIZE = 10;
export const USER_APPS_INITIAL_OFFSET = 0;
export const USER_APPS_COLUMNS = ["clientName", "scopes", "createdAt", "expiresAt", "revokedAt", "status"] as const;
export const USER_APP_DATE_FIELDS = ["createdAt", "expiresAt", "revokedAt"] as const;
