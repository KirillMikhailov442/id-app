export const CLIENT_NAME_MIN_LENGTH = 2;
export const CLIENT_NAME_MAX_LENGTH = 64;
export const CLIENT_SECRET_MIN_LENGTH = 12;
export const CLIENT_SECRET_MAX_LENGTH = 64;
export const CLIENT_LOCATION_MAX_LENGTH = 255;
export const CLIENT_MAX_SCOPES = 50;
export const CLIENT_ALLOWED_PROTOCOLS = ["http:", "https:"];
export const CLIENT_FORM_DEFAULT_VALUES = { name: "", secret: "", location: "", scopes: [] as string[] };

export const CLIENTS_SKELETON_ROWS = ["first", "second", "third"] as const;
export const CLIENTS_SKELETON_COLUMNS = ["name", "uri", "scopes", "status", "actions"] as const;

export const CLIENTS_PAGE_SIZE = 20;
export const CLIENTS_INITIAL_OFFSET = 0;
