import { atom } from "jotai";

import { DEFAULT_COUNT } from "./main.const";

class _MainModel {
  public readonly countAtom = atom(DEFAULT_COUNT);
}
export const MainModel = new _MainModel();
