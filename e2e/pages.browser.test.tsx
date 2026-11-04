import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { AxiosError } from "axios";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { page } from "vitest/browser";

import { AccountLayout } from "@app/layouts";
import { AppProvider } from "@app/providers";
import { router } from "@app/router";

import { AccountErrorPage } from "@pages/account-error";
import { MainPage } from "@pages/main";

import { AuthSessionModel } from "@features/auth-session";

import { SessionModel } from "@shared/api";
import { AppRoute, queryClient } from "@shared/config";
import { i18n } from "@shared/i18n";
import { jotaiStore } from "@shared/lib";
import { ThemeModel, THEMES } from "@shared/theme";
import { LoadingScreen } from "@shared/ui";

import { mockScreenshotApi } from "./fixtures/mock-screenshot-api";
import { pageCases } from "./fixtures/screenshot-cases";
import { screenshotAdmin, screenshotUser, viewports } from "./fixtures/screenshot-data";

import "../src/app/styles/globals.scss";
import "@id-app/shadcn/styles/globals.css";

const snapshotToken = "screenshot-access-token";
const rootPath = AppRoute.Main;
const standaloneCases = [
  { name: "loading", ready: "Loading…", component: LoadingScreen },
  { name: "main-counter", ready: "Главная страница", component: MainPage },
  {
    name: "account-error",
    ready: "Unable to load data",
    component: () => <AccountErrorPage error={new Error("Screenshot fixture")} reset={vi.fn()} />,
    accountLayout: true,
  },
] as const;

let root: Root;

const capturePage = async (name: string, ready: ReturnType<typeof page.getByText>) => {
  await expect.element(ready).toBeVisible();
  await document.fonts.ready;
  await expect(page.elementLocator(document.body)).toMatchScreenshot(name);
};

const resetSession = () => {
  SessionModel.logout();
  jotaiStore.set(AuthSessionModel.errorAtom, null);
  jotaiStore.set(AuthSessionModel.statusAtom, "ready");
};

beforeEach(async () => {
  await i18n.changeLanguage("en");
  ThemeModel.setTheme(THEMES.Light);
  resetSession();

  root = createRoot(document.body);
});

afterEach(() => {
  root.unmount();
  queryClient.clear();
  resetSession();
  vi.restoreAllMocks();
});

describe.each(viewports)("$name screenshots", ({ name: viewport, width, height }) => {
  beforeEach(async () => {
    await page.viewport(width, height);
  });

  it.each(pageCases)("$name", async (scenario) => {
    const user = scenario.session === "admin" ? screenshotAdmin : screenshotUser;

    if (scenario.session === "admin" || scenario.session === "user") {
      SessionModel.login(user, snapshotToken);
    }

    if (scenario.session === "network-error") {
      jotaiStore.set(AuthSessionModel.errorAtom, new AxiosError("Network unavailable", AxiosError.ERR_NETWORK));
    }

    mockScreenshotApi(user, "empty" in scenario && scenario.empty);

    const testRouter = createRouter({
      ...router.options,
      history: createMemoryHistory({ initialEntries: [scenario.path] }),
    });

    root.render(<RouterProvider router={testRouter} />);
    await capturePage(`${scenario.name}-${viewport}`, page.getByText(scenario.ready, { exact: true }).first());
  });

  it.each(standaloneCases)("$name", async (scenario) => {
    const useAccountLayout = "accountLayout" in scenario;

    if (useAccountLayout) {
      SessionModel.login(screenshotUser, snapshotToken);
    }

    const parent = createRootRoute({
      component: () => <AppProvider>{useAccountLayout ? <AccountLayout /> : <Outlet />}</AppProvider>,
    });
    const child = createRoute({ getParentRoute: () => parent, path: rootPath, component: scenario.component });
    const testRouter = createRouter({
      routeTree: parent.addChildren([child]),
      history: createMemoryHistory({ initialEntries: [rootPath] }),
    });

    root.render(<RouterProvider router={testRouter} />);

    const ready =
      scenario.name === "loading"
        ? page.getByRole("status", { name: scenario.ready })
        : page.getByText(scenario.ready, { exact: true });

    await capturePage(`${scenario.name}-${viewport}`, ready);
  });
});
