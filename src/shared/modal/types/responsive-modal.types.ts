import type { ReactNode } from "react";

import type { useModal } from "../hooks/use-modal";
import type { ModalId } from "../model/modal.const";
import type { ModalSize } from "./modal.types";

interface ResponsiveModalContent {
  title: string;
  description?: string;
  size?: ModalSize;
  children: ReactNode;
}

export interface ResponsiveModalProps<Id extends ModalId> {
  id: Id;
  requiredParams?: false;
  children: (
    modal: ReturnType<typeof useModal<Id>>,
    setDismissDisabled: (disabled: boolean) => void
  ) => ResponsiveModalContent;
}

export interface ResponsiveModalWithParamsProps<Id extends ModalId> {
  id: Id;
  requiredParams: true;
  children: (
    modal: Omit<ReturnType<typeof useModal<Id>>, "params"> & {
      params: Exclude<ReturnType<typeof useModal<Id>>["params"], undefined>;
    },
    setDismissDisabled: (disabled: boolean) => void
  ) => ResponsiveModalContent;
}
