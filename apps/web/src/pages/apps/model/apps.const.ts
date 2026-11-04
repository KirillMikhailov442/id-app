import { OAuthScope } from "@entities/oauth-grant";

export const APP_PERMISSIONS = [
  { scope: OAuthScope.OpenId, id: "identifier" },
  { scope: OAuthScope.UserRead, id: "userRead" },
  { scope: OAuthScope.UserWrite, id: "userWrite" },
  { scope: OAuthScope.OfflineAccess, id: "offlineAccess" },
] as const;
