import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@id-app/shadcn";

import { useModals } from "../../hooks/use-modals";
import type { ModalId, ModalSize } from "../../types";
import { ModalActions } from "../modal-actions";
import { ResponsiveModal } from "../responsive-modal";
import s from "./modal-template.module.scss";

interface ModalTemplateProps {
  id: ModalId;
  children?: ReactNode;
  title?: string;
  description?: string;
  size?: ModalSize;
  onApply?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  onExitComplete?: () => void;
  applyLoading?: boolean;
  applyDisabled?: boolean;
  applyDanger?: boolean;
  applyText?: string;
  cancelText?: string;
  hideFooter?: boolean;
}

export const ModalTemplate = ({
  id,
  children,
  title,
  description,
  size = "m",
  onApply,
  onCancel,
  onClose,
  onExitComplete,
  applyLoading = false,
  applyDisabled = false,
  applyDanger = false,
  applyText,
  cancelText,
  hideFooter = false,
}: ModalTemplateProps) => {
  const { t } = useTranslation();
  const { modals, close } = useModals();
  const isOpen = modals.some((modal) => modal.id === id && modal.isOpen);
  const handleClose = () => {
    if (applyLoading) return;

    onClose?.();
    close(id);
  };
  const handleCancel = () => {
    if (applyLoading) return;

    onCancel?.();
    handleClose();
  };

  return (
    <ResponsiveModal
      description={description}
      dismissDisabled={applyLoading}
      onClose={handleClose}
      onExitComplete={onExitComplete}
      open={isOpen}
      size={size}
      title={title ?? t("modal.defaultTitle")}
    >
      {children}
      {!hideFooter && (
        <ModalActions className={s.actions}>
          <Button disabled={applyLoading} onClick={handleCancel} type="button" variant="outline">
            {cancelText ?? t("modal.cancel")}
          </Button>
          <Button
            disabled={applyLoading || applyDisabled}
            onClick={onApply}
            type="button"
            variant={applyDanger ? "destructive" : "default"}
          >
            {applyText ?? t("modal.apply")}
          </Button>
        </ModalActions>
      )}
    </ResponsiveModal>
  );
};
