import type { SessionUser, TokenResponse } from "@shared/api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  name: string;
  surname: string;
}

export interface RegisterResponse extends TokenResponse {
  user: SessionUser;
}
