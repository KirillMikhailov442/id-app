import { atom } from "jotai";

import { jotaiStore } from "@shared/lib";

import { ADMIN_CLIENTS_INITIAL_OFFSET } from "./admin-clients.const";

class _AdminClientsModel {
  public readonly offsetAtom = atom(ADMIN_CLIENTS_INITIAL_OFFSET);
  public readonly searchAtom = atom("");
  public readonly debouncedSearchAtom = atom("");

  public setSearch = (search: string): void => {
    jotaiStore.set(this.searchAtom, search);
  };

  public applySearch = (search: string): void => {
    if (jotaiStore.get(this.debouncedSearchAtom) === search) return;

    this.setOffset(ADMIN_CLIENTS_INITIAL_OFFSET);
    jotaiStore.set(this.debouncedSearchAtom, search);
  };

  public setOffset = (offset: number): void => {
    jotaiStore.set(this.offsetAtom, offset);
  };

  public reset = (): void => {
    this.setSearch("");
    this.applySearch("");
    this.setOffset(ADMIN_CLIENTS_INITIAL_OFFSET);
  };
}

export const AdminClientsModel = new _AdminClientsModel();
