import { useCallback } from "react";
import { useAtom } from "jotai";

import { ModalModel } from "../model/modal.model";
import { ModalService } from "../service/modal.service";
import type { ModalId, ModalParams } from "../types";

export const useModal = <Id extends ModalId>(id: Id) => {
  const [modals] = useAtom(ModalModel.modalsAtom);
  const [params] = useAtom(ModalModel.modalParamsAtom);
  const open = useCallback((value?: ModalParams[Id]) => ModalService.openModal(id, value), [id]);
  const close = useCallback(() => ModalService.closeModal(id), [id]);

  return {
    isOpen: modals.some((modal) => modal.id === id && modal.isOpen),
    params: params[id],
    open,
    close,
  };
};
