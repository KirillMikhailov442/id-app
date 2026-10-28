import { useCallback, useState } from "react";

import type { ModalPresenceState } from "../types";

export const useModalPresence = <TValue>(open: boolean, value: TValue) => {
  const [state, setState] = useState<ModalPresenceState<TValue>>({ open, mounted: open, value });

  if (state.open !== open || (open && state.value !== value)) {
    setState({ open, mounted: open || state.mounted, value: open ? value : state.value });
  }

  const onExitComplete = useCallback(() => {
    setState((current) => (current.open ? current : { ...current, mounted: false }));
  }, []);

  return { mounted: open || state.mounted, value: open ? value : state.value, onExitComplete };
};
