import { useId, type ReactNode } from "react";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@id-app/shadcn";

import { useModalExit } from "../../hooks/use-modal-exit";
import type { ModalSize } from "../../types";
import s from "./dialog-template.module.scss";

interface DialogTemplateProps {
  open: boolean;
  onClose: () => void;
  onExitComplete?: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  size?: ModalSize;
  dismissDisabled?: boolean;
}

export const DialogTemplate = ({
  open,
  onClose,
  onExitComplete,
  title,
  description,
  children,
  size = "m",
  dismissDisabled = false,
}: DialogTemplateProps) => {
  const { t } = useTranslation();
  const descriptionId = useId();
  const contentRef = useModalExit(open, onExitComplete);
  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && !dismissDisabled) onClose();
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogContent
        ref={contentRef}
        aria-describedby={description === undefined ? undefined : descriptionId}
        className={clsx(s.dialog, s[size])}
        closeDisabled={dismissDisabled}
        closeLabel={t("modal.close")}
        inert={!open}
        onEscapeKeyDown={(event) => {
          if (dismissDisabled) event.preventDefault();
        }}
        onInteractOutside={(event) => {
          if (dismissDisabled) event.preventDefault();
        }}
      >
        <DialogHeader className={s.header}>
          <DialogTitle>{title}</DialogTitle>
          {description !== undefined && <DialogDescription id={descriptionId}>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
