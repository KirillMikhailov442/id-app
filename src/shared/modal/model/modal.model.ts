import { atom } from "jotai";

import { jotaiStore } from "@shared/lib";

import type { ConfirmConfig, ModalId, ModalParams, ModalState } from "../types";

class _ModalModel {
  public readonly modalsAtom = atom<ModalState[]>([]);
  public readonly modalParamsAtom = atom<Partial<ModalParams>>({});
  public readonly confirmConfigAtom = atom<ConfirmConfig | null>(null);

  public setConfirmConfig = (config: ConfirmConfig | null): void => {
    jotaiStore.set(this.confirmConfigAtom, config);
  };

  public setParams = <Id extends ModalId>(id: Id, params: ModalParams[Id] | undefined): void => {
    jotaiStore.set(this.modalParamsAtom, (previous) => ({ ...previous, [id]: params }));
  };

  public open = <Id extends ModalId>(id: Id, params?: ModalParams[Id]): void => {
    this.setParams(id, params);
    jotaiStore.set(this.modalsAtom, (previous) => [
      ...previous.filter((modal) => modal.id !== id),
      { id, isOpen: true },
    ]);
  };

  public close = (id: ModalId): void => {
    jotaiStore.set(this.modalsAtom, (previous) =>
      previous.map((modal) => (modal.id === id ? { ...modal, isOpen: false } : modal))
    );
    this.setParams(id, undefined);
  };

  public closeAll = (): void => {
    jotaiStore.set(this.modalsAtom, (previous) => previous.map((modal) => ({ ...modal, isOpen: false })));
    jotaiStore.set(this.modalParamsAtom, {});
  };
}

export const ModalModel = new _ModalModel();
