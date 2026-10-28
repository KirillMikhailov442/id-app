import { atom } from "jotai";

import { jotaiStore } from "@shared/lib";

import type { ConsentDecision } from "../types";

class _ConsentModel {
  public readonly decisionAtom = atom<ConsentDecision | null>(null);

  public setDecision = (decision: ConsentDecision | null): void => {
    jotaiStore.set(this.decisionAtom, decision);
  };
}

export const ConsentModel = new _ConsentModel();
