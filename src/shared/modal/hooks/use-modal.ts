import { useCallback, useState } from "react";
import { useAtomValue } from "jotai";

import { ModalModel } from "../model/modal.model";
import { ModalService } from "../service/modal.service";
import type { ControlledModalState, ModalId, ModalParams, ModalView, RegisteredModalView } from "../types";

export function useModal<Id extends ModalId>(target: Id): RegisteredModalView<Id>;
export function useModal<TValue>(target: ControlledModalState<TValue>): ModalView<TValue>;
export function useModal<Id extends ModalId, TValue>(target: Id | ControlledModalState<TValue>) {
  const modals = useAtomValue(ModalModel.modalsAtom);
  const modalParams = useAtomValue(ModalModel.modalParamsAtom);
  const id = typeof target === "string" ? target : undefined;
  const { isOpen, params } =
    typeof target === "string"
      ? { isOpen: modals.some((modal) => modal.id === target && modal.isOpen), params: modalParams[target] }
      : target;
  const [state, setState] = useState({ isOpen, mounted: isOpen, params: isOpen ? params : undefined });

  if (state.isOpen !== isOpen || (isOpen && !Object.is(state.params, params))) {
    setState({ isOpen, mounted: isOpen || state.mounted, params: isOpen ? params : state.params });
  }

  const onExitComplete = useCallback(() => {
    setState((current) => (current.isOpen ? current : { ...current, mounted: false, params: undefined }));
  }, []);
  const open = useCallback(
    (value?: ModalParams[Id]) => {
      if (id !== undefined) ModalService.openModal(id, value);
    },
    [id]
  );
  const close = useCallback(() => {
    if (id !== undefined) ModalService.closeModal(id);
  }, [id]);
  const view = {
    isOpen,
    mounted: isOpen || state.mounted,
    params: isOpen || !state.mounted ? params : state.params,
    onExitComplete,
  };

  return id === undefined ? view : { ...view, open, close };
}
