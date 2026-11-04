import { httpClient, type HttpRequestOptions } from "@shared/api";
import { fetchAllPages } from "@shared/lib";
import type { PaginationParams, PaginationResponse } from "@shared/types";

import type { OAuthGrant } from "../types";

class _OAuthGrantService {
  private readonly baseUrl = "/v1/oauth/grants";

  public getUser(
    userId: string,
    params: PaginationParams,
    config: HttpRequestOptions = {}
  ): Promise<PaginationResponse<OAuthGrant>> {
    return httpClient.get<PaginationResponse<OAuthGrant>>(`${this.baseUrl}/${encodeURIComponent(userId)}`, {
      ...config,
      params,
    });
  }

  public getOwn(config: HttpRequestOptions = {}): Promise<OAuthGrant[]> {
    return fetchAllPages((params) =>
      httpClient.get<PaginationResponse<OAuthGrant>>(`${this.baseUrl}/me`, { ...config, params })
    );
  }

  public revokeOwn(id: string): Promise<void> {
    return httpClient.delete<void>(`${this.baseUrl}/${encodeURIComponent(id)}/me`);
  }
}

export const OAuthGrantService = new _OAuthGrantService();
