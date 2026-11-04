import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";
import { expect, it } from "vitest";
import { commands, page } from "vitest/browser";

import { router } from "@app/router";

import { AuthSessionModel } from "@features/auth-session";

import { HTTP_BASE_URL, SessionModel } from "@shared/api";
import { AppRoute, queryClient } from "@shared/config";
import { i18n } from "@shared/i18n";
import { jotaiStore } from "@shared/lib";

import { screenshotSessions, screenshotUser, viewports } from "./fixtures/screenshot-data";

import "../src/app/styles/globals.scss";
import "@id-app/shadcn/styles/globals.css";

const expiredToken = "expired-access-token";
const refreshedToken = "refreshed-access-token";

it("refreshes an expired token and retries the protected request when opening Security", async () => {
  const [desktop] = viewports;

  await page.viewport(desktop.width, desktop.height);
  await i18n.changeLanguage("en");
  await commands.mockTokenRefresh(HTTP_BASE_URL, expiredToken, refreshedToken, screenshotUser, screenshotSessions);

  const previousStatus = jotaiStore.get(AuthSessionModel.statusAtom);
  const testRouter = createRouter({
    ...router.options,
    history: createMemoryHistory({ initialEntries: [AppRoute.Main] }),
  });
  const root = createRoot(document.body);

  SessionModel.login(screenshotUser, expiredToken);
  jotaiStore.set(AuthSessionModel.statusAtom, "ready");

  try {
    root.render(<RouterProvider router={testRouter} />);
    await expect.element(page.getByRole("heading", { name: "Morgan Alice" })).toBeVisible();
    await page.getByRole("link", { name: "Security", exact: true }).click();

    await expect.element(page.getByRole("heading", { name: "Chrome Desktop · macOS" })).toBeVisible();
    expect(jotaiStore.get(SessionModel.accessTokenAtom)).toBe(refreshedToken);
  } finally {
    root.unmount();
    queryClient.clear();
    SessionModel.logout();
    jotaiStore.set(AuthSessionModel.statusAtom, previousStatus);
  }
});
