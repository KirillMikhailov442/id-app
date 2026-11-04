import { atom } from "jotai";

import { jotaiStore } from "@shared/lib";

import type { SessionUser } from "../types";

class _SessionModel {
  public readonly userAtom = atom<SessionUser | null>(null);
  public readonly rolesAtom = atom((get) => get(this.userAtom)?.roles ?? []);
  public readonly accessTokenAtom = atom<string | null>(null);
  public readonly isAuthenticatedAtom = atom(
    (get) => get(this.userAtom) !== null && get(this.accessTokenAtom) !== null
  );

  private readonly updateSessionAtom = atom(
    null,
    (_get, set, user: SessionUser | null, accessToken?: string | null) => {
      set(this.userAtom, user);

      if (accessToken !== undefined) {
        set(this.accessTokenAtom, accessToken);
      }
    }
  );

  public login = (user: SessionUser, accessToken?: string): void => {
    jotaiStore.set(this.updateSessionAtom, user, accessToken);
  };

  public setUser = (user: SessionUser): void => {
    jotaiStore.set(this.userAtom, user);
  };

  public setAccessToken = (accessToken: string): void => {
    jotaiStore.set(this.accessTokenAtom, accessToken);
  };

  public logout = (): void => {
    jotaiStore.set(this.updateSessionAtom, null, null);
  };
}

export const SessionModel = new _SessionModel();
