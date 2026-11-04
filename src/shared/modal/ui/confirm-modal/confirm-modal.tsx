import { useTranslation } from "react-i18next";

import { useModal } from "../../hooks/use-modal";
import { ModalId } from "../../model/modal.const";
import { ModalService } from "../../service/modal.service";
import { ModalTemplate } from "../modal-template";

export const ConfirmModal = () => {
  const { t } = useTranslation();
  const { mounted, params, onExitComplete } = useModal(ModalId.Confirm);

  if (!mounted) return null;

  return (
    <ModalTemplate
      applyText={params?.apply ?? t("confirm.apply")}
      cancelText={params?.cancel ?? t("confirm.cancel")}
      description={params?.description ?? t("confirm.description")}
      id={ModalId.Confirm}
      onApply={() => ModalService.resolveConfirm("ok")}
      onExitComplete={onExitComplete}
      size="s"
      title={params?.title ?? t("confirm.title")}
    />
  );
};
