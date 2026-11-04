import { httpClient } from "@shared/api";

import type { AuthorizeRequest, AuthorizeResponse } from "../types";

class _ConsentService {
  public authorize(request: AuthorizeRequest): Promise<AuthorizeResponse> {
    return httpClient.post<AuthorizeResponse, AuthorizeRequest>("/v1/oauth/authorize", request);
  }
}

export const ConsentService = new _ConsentService();
