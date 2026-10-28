import { ModalId } from "../model/modal.const";
import { ModalModel } from "../model/modal.model";
import type { ConfirmConfig, ConfirmResult, ModalId as ModalIdType } from "../types";

class _ModalService {
  private confirmResolve: ((result: ConfirmResult) => void) | null = null;

  public askConfirm = (config: ConfirmConfig): Promise<ConfirmResult> => {
    this.resolveConfirm(null);

    return new Promise((resolve) => {
      this.confirmResolve = resolve;
      ModalModel.setConfirmConfig(config);
      ModalModel.open(ModalId.Confirm);
    });
  };

  public resolveConfirm = (result: ConfirmResult): void => {
    const resolve = this.confirmResolve;
    this.confirmResolve = null;
    ModalModel.close(ModalId.Confirm);
    ModalModel.setConfirmConfig(null);
    resolve?.(result);
  };

  public openModal = ModalModel.open;

  public closeModal = (id: ModalIdType): void => {
    if (id === ModalId.Confirm) {
      this.resolveConfirm(null);

      return;
    }

    ModalModel.close(id);
  };

  public closeAll = (): void => {
    this.resolveConfirm(null);
    ModalModel.closeAll();
  };
}

export const ModalService = new _ModalService();
