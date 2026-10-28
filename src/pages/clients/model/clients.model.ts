import { atom } from "jotai";

import type { ClientWithScopes } from "@entities/client";

import { jotaiStore } from "@shared/lib";

import { CLIENTS_INITIAL_OFFSET } from "./clients.const";

class _ClientsModel {
  public readonly offsetAtom = atom(CLIENTS_INITIAL_OFFSET);
  public readonly editorAtom = atom<ClientWithScopes | null | undefined>(undefined);

  public setOffset = (offset: number): void => {
    jotaiStore.set(this.offsetAtom, offset);
  };

  public reset = (): void => {
    this.setOffset(CLIENTS_INITIAL_OFFSET);
    this.closeEditor();
  };

  public openEditor = (client: ClientWithScopes | null = null): void => {
    jotaiStore.set(this.editorAtom, client);
  };

  public closeEditor = (): void => {
    jotaiStore.set(this.editorAtom, undefined);
  };
}

export const ClientsModel = new _ClientsModel();
