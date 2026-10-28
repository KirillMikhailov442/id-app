import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";

import { useModal } from "../../hooks/use-modal";
import { useModalPresence } from "../../hooks/use-modal-presence";
import { ModalId } from "../../model/modal.const";
import { ModalModel } from "../../model/modal.model";
import { ModalService } from "../../service/modal.service";
import { ModalTemplate } from "../modal-template";

export const ConfirmModal = () => {
  const { t } = useTranslation();
  const [config] = useAtom(ModalModel.confirmConfigAtom);
  const { isOpen } = useModal(ModalId.Confirm);
  const presence = useModalPresence(isOpen, config);
  const visibleConfig = presence.value;

  if (!presence.mounted) return null;

  return (
    <ModalTemplate
      applyText={visibleConfig?.apply ?? t("confirm.apply")}
      cancelText={visibleConfig?.cancel ?? t("confirm.cancel")}
      description={visibleConfig?.description ?? t("confirm.description")}
      id={ModalId.Confirm}
      onApply={() => ModalService.resolveConfirm("ok")}
      onExitComplete={presence.onExitComplete}
      size="s"
      title={visibleConfig?.title ?? t("confirm.title")}
    />
  );
};
