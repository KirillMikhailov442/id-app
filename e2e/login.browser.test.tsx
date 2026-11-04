import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { page } from "vitest/browser";

import { AppProvider } from "@app/providers";

import { LoginPage } from "@pages/login";

import { AuthSessionService } from "@features/auth-session";

import { AuthService } from "@entities/auth";

import { AppRoute } from "@shared/config";
import { i18n } from "@shared/i18n";

import { toast } from "@id-app/shadcn";

import "../src/app/styles/globals.scss";
import "@id-app/shadcn/styles/globals.css";

const credentials = { email: "user@example.test", password: "Valid123!" };
const accessToken = "test-access-token";
const desktopViewport = { width: 1440, height: 900 };
let root: Root;

const renderLogin = async () => {
  const parent = createRootRoute({
    component: () => (
      <AppProvider>
        <Outlet />
      </AppProvider>
    ),
  });
  const login = createRoute({ getParentRoute: () => parent, path: AppRoute.Login, component: LoginPage });
  const main = createRoute({ getParentRoute: () => parent, path: AppRoute.Main });
  const router = createRouter({
    routeTree: parent.addChildren([login, main]),
    history: createMemoryHistory({ initialEntries: [AppRoute.Login] }),
  });

  root.render(<RouterProvider router={router} />);
  await expect.element(page.getByRole("button", { name: "Sign in", exact: true })).toBeVisible();

  return router;
};

const submitCredentials = async () => {
  await page.getByLabelText("Email", { exact: true }).fill(credentials.email);
  await page.getByLabelText("Password", { exact: true }).fill(credentials.password);
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
};

beforeEach(async () => {
  await i18n.changeLanguage("en");
  await page.viewport(desktopViewport.width, desktopViewport.height);

  root = createRoot(document.body);
});

afterEach(async () => {
  toast.dismiss();
  await expect.element(page.getByText("Incorrect email or password.", { exact: true })).not.toBeInTheDocument();
  root.unmount();
  vi.restoreAllMocks();
});

describe("login form", () => {
  it("shows required-field errors without sending a request", async () => {
    const login = vi.spyOn(AuthService, "login").mockResolvedValue({ accessToken });

    await renderLogin();
    await page.getByRole("button", { name: "Sign in", exact: true }).click();

    await expect.element(page.getByText("Enter your email", { exact: true })).toBeVisible();
    await expect.element(page.getByText("Enter your password", { exact: true })).toBeVisible();
    expect(login).not.toHaveBeenCalled();
  });

  it("submits credentials and navigates to the account after completing login", async () => {
    const login = vi.spyOn(AuthService, "login").mockResolvedValue({ accessToken });
    const completeLogin = vi.spyOn(AuthSessionService, "completeLogin").mockResolvedValue(undefined);
    const router = await renderLogin();

    await submitCredentials();

    await expect.poll(() => router.state.location.pathname).toBe(AppRoute.Main);
    expect(login).toHaveBeenCalledExactlyOnceWith(credentials);
    expect(completeLogin).toHaveBeenCalledExactlyOnceWith(accessToken);
  });

  it("shows an invalid credentials error and keeps the form available", async () => {
    vi.spyOn(AuthService, "login").mockRejectedValue(
      Object.assign(new Error("Unauthorized"), {
        isAxiosError: true,
        response: { data: { code: "INVALID_CREDENTIALS" } },
      })
    );

    const router = await renderLogin();

    await submitCredentials();

    await expect.element(page.getByText("Incorrect email or password.", { exact: true })).toBeVisible();
    await expect.element(page.getByRole("button", { name: "Sign in", exact: true })).toBeEnabled();
    expect(router.state.location.pathname).toBe(AppRoute.Login);
  });
});
