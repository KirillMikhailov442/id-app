import { httpClient, type TokenResponse } from "@shared/api";

import type { LoginRequest, RegisterRequest, RegisterResponse } from "../types";

class _AuthService {
  private readonly baseUrl = "/v1";
  private readonly client = httpClient;

  public login(data: LoginRequest): Promise<TokenResponse> {
    return this.client.post<TokenResponse, LoginRequest>(`${this.baseUrl}/auth/login`, data, {
      skipAuth: true,
    });
  }

  public register(data: RegisterRequest): Promise<RegisterResponse> {
    return this.client.post<RegisterResponse, RegisterRequest>(`${this.baseUrl}/users`, data, {
      skipAuth: true,
    });
  }

  public logout(): Promise<void> {
    return this.client.post<void>(`${this.baseUrl}/auth/logout`);
  }

  public logoutAll(): Promise<void> {
    return this.client.post<void>(`${this.baseUrl}/auth/logout-all`);
  }
}

export const AuthService = new _AuthService();
