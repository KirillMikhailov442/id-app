import type { Client } from "@entities/client";

import type { ModalId } from "@shared/modal";

import type { ClientCredentials } from "./client-credentials.types";

declare module "@shared/modal" {
  interface ModalParams {
    [ModalId.ClientEdit]: Client | null;
    [ModalId.ClientCredentials]: ClientCredentials;
  }
}
