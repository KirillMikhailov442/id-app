import type { Client } from "@entities/client";
import { OAuthGrantStatus, OAuthScope, type OAuthGrant } from "@entities/oauth-grant";
import type { Session } from "@entities/session";

import { UserRole, type SessionUser } from "@shared/api";
import type { PaginationResponse } from "@shared/types";

export const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
] as const;

const createdAt = "2025-02-10T12:00:00Z";
const updatedAt = "2025-03-15T12:00:00Z";
const expiresAt = "2099-01-01T12:00:00Z";

export const screenshotUser: SessionUser = {
  id: "user-alice",
  name: "Alice",
  surname: "Morgan",
  email: "alice@example.test",
  avatar: "",
  roles: [UserRole.User],
  emailConfirmed: true,
  blocked: false,
  createdAt,
  updatedAt,
};

export const screenshotAdmin: SessionUser = {
  ...screenshotUser,
  id: "user-admin",
  name: "Robin",
  surname: "Parker",
  email: "robin@example.test",
  roles: [UserRole.Admin],
};

export const screenshotClient: Client = {
  id: "client-notes",
  userId: screenshotUser.id,
  name: "Orbit Notes",
  location: "https://notes.example.test",
  isActive: true,
  scopes: [OAuthScope.OpenId, OAuthScope.UserRead],
  createdAt,
};

export const screenshotGrant: OAuthGrant = {
  id: "grant-notes",
  clientId: screenshotClient.id,
  clientName: screenshotClient.name,
  scopes: [OAuthScope.OpenId, OAuthScope.UserRead],
  status: OAuthGrantStatus.Active,
  createdAt,
  expiresAt,
  revokedAt: null,
};

export const screenshotSessions: Session[] = [
  {
    id: "session-desktop",
    userId: screenshotUser.id,
    os: "macOS",
    browser: "Chrome",
    deviceType: "desktop",
    isCurrent: true,
    ip: "192.0.2.1",
    createdAt,
    lastUsedAt: updatedAt,
    expiresAt,
    revokedAt: null,
  },
  {
    id: "session-mobile",
    userId: screenshotUser.id,
    os: "iOS",
    browser: "Safari",
    deviceType: "mobile",
    isCurrent: false,
    ip: "192.0.2.2",
    createdAt,
    lastUsedAt: updatedAt,
    expiresAt,
    revokedAt: null,
  },
];

const pageLimit = 10;

export const screenshotList = <T>(items: T[]): PaginationResponse<T> => ({
  items,
  meta: { total: items.length, limit: pageLimit, offset: 0 },
});
