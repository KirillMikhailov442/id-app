import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it } from "vitest";
import { page } from "vitest/browser";

import { router } from "@app/router";

import { AuthSessionModel } from "@features/auth-session";

import { SessionModel } from "@shared/api";
import { AppRoute } from "@shared/config";
import { i18n } from "@shared/i18n";
import { jotaiStore } from "@shared/lib";

import { screenshotUser } from "./fixtures/screenshot-data";

import "../src/app/styles/globals.scss";
import "@id-app/shadcn/styles/globals.css";

const accessToken = "regular-user-access-token";
let root: Root;

const openRoute = (path: string) => {
  const testRouter = createRouter({
    ...router.options,
    history: createMemoryHistory({ initialEntries: [path] }),
  });

  root.render(<RouterProvider router={testRouter} />);

  return testRouter;
};

beforeEach(async () => {
  await i18n.changeLanguage("en");
  SessionModel.logout();
  jotaiStore.set(AuthSessionModel.statusAtom, "ready");

  root = createRoot(document.body);
});

afterEach(() => {
  root.unmount();
  SessionModel.logout();
  jotaiStore.set(AuthSessionModel.statusAtom, "idle");
});

it("redirects a guest who opens Security directly to the login page", async () => {
  const testRouter = openRoute(AppRoute.Security);

  await expect.element(page.getByRole("button", { name: "Sign in", exact: true })).toBeVisible();
  expect(testRouter.state.location.pathname).toBe(AppRoute.Login);
});

it("shows a 404 when a regular user opens the admin users page directly", async () => {
  SessionModel.login(screenshotUser, accessToken);

  const testRouter = openRoute(AppRoute.AdminUsers);

  await expect.element(page.getByRole("heading", { name: "404 — Page not found" })).toBeVisible();
  expect(testRouter.state.location.pathname).toBe(AppRoute.AdminUsers);
});
