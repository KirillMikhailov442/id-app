import { atom } from "jotai";

import { jotaiStore } from "@shared/lib";

import type { ModalLayer } from "../types";

class _ModalLayerModel {
  public readonly layersAtom = atom<ModalLayer[]>([]);

  public register = (layer: ModalLayer): void => {
    jotaiStore.set(this.layersAtom, (layers) => [...layers.filter(({ id }) => id !== layer.id), layer]);
  };

  public unregister = (id: string): void => {
    jotaiStore.set(this.layersAtom, (layers) => layers.filter((layer) => layer.id !== id));
  };
}

export const ModalLayerModel = new _ModalLayerModel();
