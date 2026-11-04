import { atom } from "jotai";

import { jotaiStore } from "@shared/lib";

import type { ConsentDecision, ConsentError } from "../types";

class _ConsentModel {
  public readonly decisionAtom = atom<ConsentDecision | null>(null);
  public readonly isSubmittingAtom = atom(false);
  public readonly errorAtom = atom<ConsentError | null>(null);

  public beginSubmission = (): boolean => {
    if (jotaiStore.get(this.isSubmittingAtom)) return false;

    jotaiStore.set(this.isSubmittingAtom, true);
    this.setError(null);

    return true;
  };

  public finishSubmission = (): void => {
    jotaiStore.set(this.isSubmittingAtom, false);
  };

  public setError = (error: ConsentError | null): void => {
    jotaiStore.set(this.errorAtom, error);
  };

  public reset = (): void => {
    this.setDecision(null);
    this.setError(null);
  };

  public setDecision = (decision: ConsentDecision | null): void => {
    jotaiStore.set(this.decisionAtom, decision);
  };
}

export const ConsentModel = new _ConsentModel();
