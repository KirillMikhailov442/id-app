import type { Session } from "@entities/session";

export const isUserSessionActive = (session: Session): boolean =>
  session.revokedAt === null && new Date(session.expiresAt).getTime() > Date.now();
