import { CircleUserRound, Clock, UserRound, UserRoundPen } from "lucide-react";

import { OAuthScope } from "@entities/oauth-grant";

export const CONSENT_ROUTE_ID = "/_auth/consent";
export const CONSENT_UNSAFE_REDIRECT_PROTOCOLS = ["javascript:", "data:", "vbscript:", "file:", "blob:", "about:"];
export const CONSENT_PERMISSIONS = [
  { scope: OAuthScope.OpenId, id: "identifier", icon: CircleUserRound },
  { scope: OAuthScope.UserRead, id: "userRead", icon: UserRound },
  { scope: OAuthScope.UserWrite, id: "userWrite", icon: UserRoundPen },
  { scope: OAuthScope.OfflineAccess, id: "offlineAccess", icon: Clock },
] as const;
