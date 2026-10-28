import type { ComponentProps } from "react";

import { useMediaQuery } from "@shared/lib";

import { MOBILE_MODAL_QUERY } from "../model/responsive-modal.const";
import { BottomSheetTemplate } from "./bottom-sheet-template";
import { DialogTemplate } from "./dialog-template";

interface ResponsiveModalProps extends ComponentProps<typeof DialogTemplate> {}

export const ResponsiveModal = (props: ResponsiveModalProps) => {
  const mobile = useMediaQuery(MOBILE_MODAL_QUERY);

  return mobile ? <BottomSheetTemplate {...props} /> : <DialogTemplate {...props} />;
};
