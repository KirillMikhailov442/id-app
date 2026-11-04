import { atom } from "jotai";

import type { AuthSessionStatus } from "../types";

class _AuthSessionModel {
  public readonly statusAtom = atom<AuthSessionStatus>("idle");
  public readonly errorAtom = atom<Error | null>(null);
  public readonly isLoggingOutAtom = atom(false);
}

export const AuthSessionModel = new _AuthSessionModel();
