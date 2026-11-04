import { httpClient, type HttpRequestOptions } from "@shared/api";

import type { Session } from "../types";

class _SessionService {
  private readonly baseUrl = "/v1/users/me/sessions";

  public getAll(config: HttpRequestOptions = {}): Promise<Session[]> {
    return httpClient.get<Session[]>(this.baseUrl, config);
  }

  public revoke(id: string): Promise<void> {
    return httpClient.delete<void>(`${this.baseUrl}/${encodeURIComponent(id)}`);
  }
}

export const SessionService = new _SessionService();
