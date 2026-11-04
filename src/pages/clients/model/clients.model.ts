import { atom } from "jotai";

import type { Client } from "@entities/client";

import { jotaiStore } from "@shared/lib";

import type { ClientCredentials } from "../types";
import { CLIENTS_INITIAL_OFFSET } from "./clients.const";

class _ClientsModel {
  public readonly offsetAtom = atom(CLIENTS_INITIAL_OFFSET);
  public readonly editorAtom = atom<Client | null | undefined>(undefined);
  public readonly credentialsAtom = atom<ClientCredentials | null>(null);

  public setOffset = (offset: number): void => {
    jotaiStore.set(this.offsetAtom, offset);
  };

  public reset = (): void => {
    this.setOffset(CLIENTS_INITIAL_OFFSET);
    this.closeEditor();
    this.closeCredentials();
  };

  public openEditor = (client: Client | null = null): void => {
    jotaiStore.set(this.editorAtom, client);
  };

  public closeEditor = (): void => {
    jotaiStore.set(this.editorAtom, undefined);
  };

  public openCredentials = (credentials: ClientCredentials): void => {
    jotaiStore.set(this.credentialsAtom, credentials);
  };

  public closeCredentials = (): void => {
    jotaiStore.set(this.credentialsAtom, null);
  };
}

export const ClientsModel = new _ClientsModel();
