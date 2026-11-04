import { useCallback, useState } from "react";
import { useAtomValue } from "jotai";

import { ModalModel } from "../model/modal.model";
import { ModalService } from "../service/modal.service";
import type { ModalId, ModalParams } from "../types";

export const useModal = <Id extends ModalId>(id: Id) => {
  const modals = useAtomValue(ModalModel.modalsAtom);
  const modalParams = useAtomValue(ModalModel.modalParamsAtom);
  const isOpen = modals.some((modal) => modal.id === id && modal.isOpen);
  const params = modalParams[id];
  const [state, setState] = useState({ isOpen, mounted: isOpen, params: isOpen ? params : undefined });

  if (state.isOpen !== isOpen || (isOpen && !Object.is(state.params, params))) {
    setState({ isOpen, mounted: isOpen || state.mounted, params: isOpen ? params : state.params });
  }

  const onExitComplete = useCallback(() => {
    setState((current) => (current.isOpen ? current : { ...current, mounted: false, params: undefined }));
  }, []);
  const open = useCallback((value?: ModalParams[Id]) => ModalService.openModal(id, value), [id]);
  const close = useCallback(() => ModalService.closeModal(id), [id]);

  return {
    isOpen,
    mounted: isOpen || state.mounted,
    params: isOpen ? params : state.params,
    onExitComplete,
    open,
    close,
  };
};
