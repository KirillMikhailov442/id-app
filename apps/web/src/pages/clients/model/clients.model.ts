import { atom } from "jotai";

import type { Client } from "@entities/client";

import { jotaiStore } from "@shared/lib";
import { ModalId, ModalService } from "@shared/modal";

import type { ClientCredentials } from "../types";
import { CLIENTS_INITIAL_OFFSET } from "./clients.const";

class _ClientsModel {
  public readonly offsetAtom = atom(CLIENTS_INITIAL_OFFSET);

  public setOffset = (offset: number): void => {
    jotaiStore.set(this.offsetAtom, offset);
  };

  public reset = (): void => {
    this.setOffset(CLIENTS_INITIAL_OFFSET);
    this.closeEditor();
    this.closeCredentials();
  };

  public openEditor = (client: Client | null = null): void => {
    ModalService.openModal(ModalId.ClientEdit, client);
  };

  public closeEditor = (): void => {
    ModalService.closeModal(ModalId.ClientEdit);
  };

  public openCredentials = (credentials: ClientCredentials): void => {
    ModalService.openModal(ModalId.ClientCredentials, credentials);
  };

  public closeCredentials = (): void => {
    ModalService.closeModal(ModalId.ClientCredentials);
  };
}

export const ClientsModel = new _ClientsModel();
