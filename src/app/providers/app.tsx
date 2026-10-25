import type { FC, ReactNode } from "react";
import { Provider as JotaiProvider } from "jotai";

import { jotaiStore } from "@shared/lib";

export const AppProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return <JotaiProvider store={jotaiStore}>{children}</JotaiProvider>;
};
