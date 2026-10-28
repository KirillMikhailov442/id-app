import type { FC, ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";

import "dayjs/locale/ru";

import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import { Provider as JotaiProvider } from "jotai";
import { I18nextProvider } from "react-i18next";

import { queryClient } from "@shared/config";
import { i18n } from "@shared/i18n";
import { jotaiStore } from "@shared/lib";
import { ThemeMetadata } from "@shared/theme";

import { Toaster } from "@id-app/shadcn";

import { ModalsProvider } from "./modals";

dayjs.extend(localizedFormat);
dayjs.extend(utc);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <JotaiProvider store={jotaiStore}>
        <ThemeMetadata />
        <QueryClientProvider client={queryClient}>
          <ModalsProvider>{children}</ModalsProvider>
          <Toaster />
        </QueryClientProvider>
      </JotaiProvider>
    </I18nextProvider>
  );
};
