import { useEffect, useId, useLayoutEffect, useRef } from "react";

import { ModalLayerModel } from "../model/modal-layer.model";

export const useModalLayer = (active: boolean, onClose: () => void, dismissDisabled: boolean): void => {
  const id = useId();
  const callbacks = useRef({ onClose, dismissDisabled });

  useLayoutEffect(() => {
    callbacks.current = { onClose, dismissDisabled };
  }, [onClose, dismissDisabled]);

  useEffect(() => {
    if (!active) return;

    ModalLayerModel.register({
      id,
      close: () => callbacks.current.onClose(),
      canDismiss: () => !callbacks.current.dismissDisabled,
    });

    return () => ModalLayerModel.unregister(id);
  }, [active, id]);
};
