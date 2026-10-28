export interface SessionUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  emailConfirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TokenResponse {
  accessToken: string;
}
