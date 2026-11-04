import { useState } from "react";

import { useMediaQuery } from "@shared/lib";

import { useModal } from "../hooks/use-modal";
import { MOBILE_MODAL_QUERY } from "../model/responsive-modal.const";
import type { ModalId, ResponsiveModalProps, ResponsiveModalWithParamsProps } from "../types";
import { BottomSheetTemplate } from "./bottom-sheet-template";
import { DialogTemplate } from "./dialog-template";

const hasParams = <Params,>(params: Params): params is Exclude<Params, undefined> => params !== undefined;

export const ResponsiveModal = <Id extends ModalId>({
  id,
  requiredParams,
  children,
}: ResponsiveModalProps<Id> | ResponsiveModalWithParamsProps<Id>) => {
  const modal = useModal(id);
  const mobile = useMediaQuery(MOBILE_MODAL_QUERY);
  const [dismissDisabled, setDismissDisabled] = useState(false);
  const [presentation, setPresentation] = useState({ mounted: modal.mounted, mobile });

  if (presentation.mounted !== modal.mounted) {
    setPresentation({ mounted: modal.mounted, mobile: modal.mounted ? mobile : presentation.mobile });
  }

  if (!modal.mounted) return null;

  const content =
    requiredParams === true
      ? hasParams(modal.params)
        ? children({ ...modal, params: modal.params }, setDismissDisabled)
        : null
      : children(modal, setDismissDisabled);

  if (content === null) return null;

  const Surface = presentation.mobile ? BottomSheetTemplate : DialogTemplate;

  return (
    <Surface
      {...content}
      dismissDisabled={dismissDisabled}
      onClose={modal.close}
      onExitComplete={modal.onExitComplete}
      open={modal.isOpen}
    />
  );
};
