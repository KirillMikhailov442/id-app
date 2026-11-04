import type { RouterHistory } from "@tanstack/react-router";

import { jotaiStore } from "@shared/lib";

import { MODAL_HISTORY_STATE_KEY } from "../model/modal-history.const";
import { ModalLayerModel } from "../model/modal-layer.model";
import { readModalHistory } from "./read-modal-history";

export class ModalHistoryController {
  private readonly history: RouterHistory;
  private href: string;
  private disposed = false;
  private scheduled = false;
  private writing = false;
  private traversing = false;
  private cleanups: (() => void)[] = [];

  public constructor(history: RouterHistory) {
    this.history = history;
    this.href = history.location.href;
  }

  public start = (): void => {
    this.cleanups = [
      jotaiStore.sub(ModalLayerModel.layersAtom, this.scheduleSync),
      this.history.subscribe(this.onHistoryChange),
      this.history.block({
        enableBeforeUnload: false,
        blockerFn: ({ action, nextLocation }) => {
          if (action !== "BACK" && action !== "GO") return false;

          const nextIds = readModalHistory(nextLocation.state);

          return jotaiStore
            .get(ModalLayerModel.layersAtom)
            .some((layer) => !nextIds.includes(layer.id) && !layer.canDismiss());
        },
      }),
    ];
    this.scheduleSync();
  };

  public stop = (): void => {
    this.disposed = true;
    this.cleanups.forEach((cleanup) => cleanup());
  };

  private scheduleSync = (): void => {
    if (this.disposed || this.scheduled) return;

    this.scheduled = true;
    queueMicrotask(() => {
      this.scheduled = false;

      if (!this.disposed && !this.traversing) this.sync();
    });
  };

  private sync = (): void => {
    const ids = jotaiStore.get(ModalLayerModel.layersAtom).map(({ id }) => id);
    const currentIds = readModalHistory(this.history.location.state);
    let commonLength = 0;

    while (commonLength < ids.length && ids[commonLength] === currentIds[commonLength]) {
      commonLength += 1;
    }

    if (currentIds.length > commonLength) {
      this.traversing = true;
      this.history.flush();
      this.history.go(commonLength - currentIds.length, { ignoreBlocker: true });

      return;
    }

    this.writing = true;

    try {
      for (let count = commonLength + 1; count <= ids.length; count += 1) {
        this.history.push(
          this.history.location.href,
          {
            ...this.history.location.state,
            [MODAL_HISTORY_STATE_KEY]: ids.slice(0, count),
          },
          { ignoreBlocker: true }
        );
        this.history.flush();
      }
    } finally {
      this.writing = false;
    }
  };

  private onHistoryChange = (): void => {
    if (this.writing || this.disposed) return;

    const location = this.history.location;
    const routeChanged = location.href !== this.href;
    this.href = location.href;

    if (this.traversing && !routeChanged) {
      this.traversing = false;
      this.scheduleSync();

      return;
    }

    this.traversing = false;

    const ids = routeChanged ? [] : readModalHistory(location.state);
    const layers = jotaiStore.get(ModalLayerModel.layersAtom);

    for (const layer of [...layers].reverse()) {
      if (!ids.includes(layer.id)) {
        layer.close();
        ModalLayerModel.unregister(layer.id);
      }
    }

    const liveIds = ids.filter((id) => jotaiStore.get(ModalLayerModel.layersAtom).some((layer) => layer.id === id));

    if (liveIds.length !== readModalHistory(location.state).length) {
      this.writing = true;

      try {
        this.history.replace(
          location.href,
          {
            ...location.state,
            [MODAL_HISTORY_STATE_KEY]: liveIds,
          },
          { ignoreBlocker: true }
        );
      } finally {
        this.writing = false;
      }
    }

    this.scheduleSync();
  };
}
