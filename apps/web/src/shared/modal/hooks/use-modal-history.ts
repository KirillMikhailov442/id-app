import { useEffect } from "react";
import type { RouterHistory } from "@tanstack/react-router";

import { ModalHistoryController } from "../lib/modal-history-controller";

export const useModalHistory = (history: RouterHistory): void => {
  useEffect(() => {
    const controller = new ModalHistoryController(history);
    controller.start();

    return controller.stop;
  }, [history]);
};
