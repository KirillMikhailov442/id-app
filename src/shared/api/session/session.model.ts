import { atom } from "jotai";

import { jotaiStore } from "@shared/lib";

import type { SessionUser } from "./types";

class _SessionModel {
  public readonly userAtom = atom<SessionUser | null>(null);
  public readonly accessTokenAtom = atom<string | null>(null);
  public readonly isAuthenticatedAtom = atom(
    (get) => get(this.userAtom) !== null && get(this.accessTokenAtom) !== null
  );

  public setUser = (user: SessionUser): void => {
    jotaiStore.set(this.userAtom, user);
  };

  public setAccessToken = (accessToken: string): void => {
    jotaiStore.set(this.accessTokenAtom, accessToken);
  };

  public clear = (): void => {
    jotaiStore.set(this.userAtom, null);
    jotaiStore.set(this.accessTokenAtom, null);
  };
}

export const SessionModel = new _SessionModel();
