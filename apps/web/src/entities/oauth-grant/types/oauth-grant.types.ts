import type { OAuthGrantStatus } from "../model/oauth-grant-status.const";
import type { OAuthScope } from "../model/oauth-scope.const";

export interface OAuthGrant {
  id: string;
  clientId: string;
  clientName: string;
  scopes: OAuthScope[];
  createdAt: string;
  expiresAt: string;
  revokedAt: string | null;
  status: OAuthGrantStatus;
}
