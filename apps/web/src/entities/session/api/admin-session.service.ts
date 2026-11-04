import { httpClient, type HttpRequestOptions } from "@shared/api";
import type { PaginationResponse } from "@shared/types";

import type { GetUserSessionsParams, Session } from "../types";

class _AdminSessionService {
  private readonly baseUrl = "/v1/users";

  public getAll(
    userId: string,
    params: GetUserSessionsParams,
    config: HttpRequestOptions = {}
  ): Promise<PaginationResponse<Session>> {
    return httpClient.get<PaginationResponse<Session>>(this.getUrl(userId), { ...config, params });
  }

  public revoke(userId: string, sessionId: string): Promise<void> {
    return httpClient.delete<void>(`${this.getUrl(userId)}/${encodeURIComponent(sessionId)}`);
  }

  public revokeAll(userId: string): Promise<void> {
    return httpClient.delete<void>(this.getUrl(userId));
  }

  private getUrl(userId: string): string {
    return `${this.baseUrl}/${encodeURIComponent(userId)}/sessions`;
  }
}

export const AdminSessionService = new _AdminSessionService();
