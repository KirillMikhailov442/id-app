import { MODAL_HISTORY_STATE_KEY } from "../model/modal-history.const";

export const readModalHistory = (state: unknown): string[] => {
  if (typeof state !== "object" || state === null || !(MODAL_HISTORY_STATE_KEY in state)) return [];

  const value: unknown = state[MODAL_HISTORY_STATE_KEY];

  return Array.isArray(value) ? value.filter((id: unknown): id is string => typeof id === "string") : [];
};
