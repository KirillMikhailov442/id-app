import { AuthService, type RegisterResponse } from "@entities/auth";
import { UserService } from "@entities/user";

import { isSessionExpiredError, SessionModel, tokenRefreshService, type SessionUser } from "@shared/api";
import { jotaiStore } from "@shared/lib";

import { AuthSessionModel } from "../model/auth-session.model";

class _AuthSessionService {
  private initialization: Promise<void> | null = null;
  private revision = 0;

  public initialize = (): Promise<void> => {
    if (this.initialization !== null) {
      return this.initialization;
    }

    const status = jotaiStore.get(AuthSessionModel.statusAtom);

    if (status !== "idle" && status !== "error") {
      return Promise.resolve();
    }

    this.initialization = this.restore().finally(() => {
      this.initialization = null;
    });

    return this.initialization;
  };

  public completeLogin = async (accessToken: string): Promise<void> => {
    const revision = ++this.revision;

    try {
      SessionModel.setAccessToken(accessToken);

      const user = await UserService.getProfile();
      this.assertRevision(revision);
      this.setUser(user);
    } catch (error) {
      if (revision === this.revision) {
        this.clear();
      }

      throw error;
    }
  };

  public completeRegistration = ({ accessToken, user }: RegisterResponse): void => {
    ++this.revision;
    SessionModel.setAccessToken(accessToken);
    this.setUser(user);
  };

  public logout = (): Promise<void> => this.endSession(() => AuthService.logout());

  public logoutAll = (): Promise<void> => this.endSession(() => AuthService.logoutAll());

  private endSession = async (request: () => Promise<void>): Promise<void> => {
    ++this.revision;
    jotaiStore.set(AuthSessionModel.isLoggingOutAtom, true);

    try {
      await request();
      this.clear();
    } catch (error) {
      if (!isSessionExpiredError(error)) {
        throw error;
      }

      this.clear();
    } finally {
      jotaiStore.set(AuthSessionModel.isLoggingOutAtom, false);
    }
  };

  private clear = (): void => {
    ++this.revision;
    SessionModel.clear();
    jotaiStore.set(AuthSessionModel.errorAtom, null);
    jotaiStore.set(AuthSessionModel.statusAtom, "ready");
  };

  private setUser(user: SessionUser): void {
    SessionModel.setUser(user);
    jotaiStore.set(AuthSessionModel.errorAtom, null);
    jotaiStore.set(AuthSessionModel.statusAtom, "ready");
  }

  private assertRevision(revision: number): void {
    if (revision !== this.revision) {
      throw new Error("Session changed during the request");
    }
  }

  private async restore(): Promise<void> {
    const revision = this.revision;
    jotaiStore.set(AuthSessionModel.statusAtom, "loading");
    jotaiStore.set(AuthSessionModel.errorAtom, null);

    try {
      await tokenRefreshService.refreshTokens();

      const user = await UserService.getProfile();
      this.assertRevision(revision);
      this.setUser(user);
    } catch (error) {
      if (revision !== this.revision) {
        return;
      }

      if (isSessionExpiredError(error)) {
        this.clear();
      } else {
        jotaiStore.set(
          AuthSessionModel.errorAtom,
          error instanceof Error ? error : new Error("Failed to restore session")
        );
        jotaiStore.set(AuthSessionModel.statusAtom, "error");
      }
    }
  }
}

export const AuthSessionService = new _AuthSessionService();
