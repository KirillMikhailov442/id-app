export interface Session {
  id: string;
  os: string | null;
  browser: string | null;
  deviceType: string | null;
  createdAt: string;
  lastUsedAt: string;
  isCurrent: boolean;
  userId: string;
  ip: string;
  expiresAt: string;
  revokedAt: string | null;
}
