import type { UserRole } from "../model/user-role.enum";

export interface SessionUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  avatar: string;
  roles: UserRole[];
  emailConfirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TokenResponse {
  accessToken: string;
}
