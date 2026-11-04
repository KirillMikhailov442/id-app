export type ConsentDecision = "allow" | "deny";

export type ConsentError = "invalidRequest";

export interface AuthorizeRequest {
  clientId: string;
  redirectUri: string;
  scope: string;
  state?: string;
}

export interface AuthorizeResponse {
  redirectUrl: string;
}
