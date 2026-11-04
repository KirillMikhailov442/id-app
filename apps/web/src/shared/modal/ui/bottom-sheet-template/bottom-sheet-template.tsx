import { useId, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from "@id-app/shadcn";

import { useModalExit } from "../../hooks/use-modal-exit";
import { useModalLayer } from "../../hooks/use-modal-layer";
import s from "./bottom-sheet-template.module.scss";

interface BottomSheetTemplateProps {
  open: boolean;
  onClose: () => void;
  onExitComplete?: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  dismissDisabled?: boolean;
}

export const BottomSheetTemplate = ({
  open,
  onClose,
  onExitComplete,
  title,
  description,
  children,
  dismissDisabled = false,
}: BottomSheetTemplateProps) => {
  const { t } = useTranslation();
  const descriptionId = useId();
  const contentRef = useModalExit(open, onExitComplete);
  const handleClose = () => {
    if (!dismissDisabled) onClose();
  };
  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) handleClose();
  };

  useModalLayer(open, handleClose, dismissDisabled);

  return (
    <Drawer
      dismissible={!dismissDisabled}
      fixed
      onOpenChange={handleOpenChange}
      open={open}
      repositionInputs
      shouldScaleBackground={false}
    >
      <DrawerContent
        ref={contentRef}
        aria-describedby={description === undefined ? undefined : descriptionId}
        className={s.sheet}
        closeDisabled={dismissDisabled}
        closeLabel={t("modal.close")}
        inert={!open}
      >
        <div className={s.header}>
          <DrawerTitle className={s.title}>{title}</DrawerTitle>
          {description !== undefined && (
            <DrawerDescription className={s.description} id={descriptionId}>
              {description}
            </DrawerDescription>
          )}
        </div>
        <div className={s.body}>{children}</div>
      </DrawerContent>
    </Drawer>
  );
};
