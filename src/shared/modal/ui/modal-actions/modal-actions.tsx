import type { ReactNode } from "react";
import { clsx } from "clsx";

import s from "./modal-actions.module.scss";

interface ModalActionsProps {
  children: ReactNode;
  className?: string;
}

export const ModalActions = ({ children, className }: ModalActionsProps) => (
  <div className={clsx(s.actions, className)} data-slot="modal-actions">
    {children}
  </div>
);
