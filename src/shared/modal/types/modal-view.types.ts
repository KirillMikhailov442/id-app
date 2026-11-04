import type { ModalId } from "../model/modal.const";
import type { ModalParams } from "./modal.types";

export interface ControlledModalState<TValue> {
  isOpen: boolean;
  params: TValue;
}

export interface ModalView<TValue> extends ControlledModalState<TValue> {
  mounted: boolean;
  onExitComplete: () => void;
}

export interface RegisteredModalView<Id extends ModalId> extends ModalView<ModalParams[Id] | undefined> {
  open: (value?: ModalParams[Id]) => void;
  close: () => void;
}
