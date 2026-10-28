import { httpClient, type HttpRequestOptions, type SessionUser } from "@shared/api";
import type { PaginationParams, PaginationResponse } from "@shared/types";

import type { ChangePasswordRequest, UpdateProfileRequest } from "../types";

class _UserService {
  private readonly baseUrl = "/v1/users";
  private readonly client = httpClient;

  public getAll(params?: PaginationParams, config: HttpRequestOptions = {}): Promise<PaginationResponse<SessionUser>> {
    return this.client.get<PaginationResponse<SessionUser>>(this.baseUrl, { ...config, params });
  }

  public getById(id: string, config: HttpRequestOptions = {}): Promise<SessionUser> {
    return this.client.get<SessionUser>(`${this.baseUrl}/${encodeURIComponent(id)}`, config);
  }

  public getProfile(config: HttpRequestOptions = {}): Promise<SessionUser> {
    return this.client.get<SessionUser>(`${this.baseUrl}/me`, config);
  }

  public updateProfile(data: UpdateProfileRequest): Promise<SessionUser> {
    return this.client.put<SessionUser, UpdateProfileRequest>(`${this.baseUrl}/me`, data);
  }

  public changePassword(data: ChangePasswordRequest): Promise<void> {
    return this.client.patch<void, ChangePasswordRequest>(`${this.baseUrl}/me/password`, data);
  }
}

export const UserService = new _UserService();
