import type { SessionUser } from "@shared/api";

import type { ModalId } from "../model/modal.const";

export type ConfirmResult = "ok" | null;
export type ModalSize = "s" | "m" | "l" | "xl";

export interface ModalState {
  id: ModalId;
  isOpen: boolean;
}

export interface ConfirmConfig {
  title?: string;
  description?: string;
  apply?: string;
  cancel?: string;
}

export interface ModalParams {
  [ModalId.ChangePassword]: undefined;
  [ModalId.Confirm]: ConfirmConfig;
  [ModalId.ProfileEdit]: SessionUser;
}
