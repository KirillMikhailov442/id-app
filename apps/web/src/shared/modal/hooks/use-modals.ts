import { useAtom } from "jotai";

import { ModalModel } from "../model/modal.model";
import { ModalService } from "../service/modal.service";

export const useModals = () => {
  const [modals] = useAtom(ModalModel.modalsAtom);

  return { modals, open: ModalService.openModal, close: ModalService.closeModal, closeAll: ModalService.closeAll };
};
