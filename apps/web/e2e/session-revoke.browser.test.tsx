import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { page } from "vitest/browser";

import { router } from "@app/router";

import { AuthSessionModel } from "@features/auth-session";

import { SessionService } from "@entities/session";

import { SessionModel } from "@shared/api";
import { AppRoute, queryClient } from "@shared/config";
import { i18n } from "@shared/i18n";
import { jotaiStore } from "@shared/lib";

import { toast } from "@id-app/shadcn";

import { screenshotSessions, screenshotUser, viewports } from "./fixtures/screenshot-data";

import "../src/app/styles/globals.scss";
import "@id-app/shadcn/styles/globals.css";

const accessToken = "security-test-access-token";
const [currentSession, otherSession] = screenshotSessions;
const currentDevice = "Chrome Desktop · macOS";
const otherDevice = "Safari Mobile · iOS";
const successMessage = "Session ended";
const errorMessage = "Failed to sign out. Please try again.";
let root: Root;

const sessionHeading = (name: string) => page.getByRole("heading", { name, exact: true });

const openRevokeDialog = async () => {
  await page.getByRole("button", { name: `Sign out of ${otherDevice} session`, exact: true }).click();

  const dialog = page.getByRole("dialog", { name: "Sign out of this session?" });

  await expect.element(dialog).toBeVisible();

  return dialog;
};

beforeEach(async () => {
  const [desktop] = viewports;

  await page.viewport(desktop.width, desktop.height);
  await i18n.changeLanguage("en");

  const testRouter = createRouter({
    ...router.options,
    history: createMemoryHistory({ initialEntries: [AppRoute.Security] }),
  });

  SessionModel.login(screenshotUser, accessToken);
  jotaiStore.set(AuthSessionModel.statusAtom, "ready");
  vi.spyOn(SessionService, "getAll").mockResolvedValue(screenshotSessions);

  root = createRoot(document.body);
  root.render(<RouterProvider router={testRouter} />);
});

afterEach(async () => {
  try {
    toast.dismiss();
    await expect.element(page.getByText(successMessage, { exact: true })).not.toBeInTheDocument();
    await expect.element(page.getByText(errorMessage, { exact: true })).not.toBeInTheDocument();
  } finally {
    root.unmount();
    queryClient.clear();
    SessionModel.logout();
    jotaiStore.set(AuthSessionModel.statusAtom, "idle");
    vi.restoreAllMocks();
  }
});

it("revokes only the selected session after confirmation", async () => {
  const getSessions = vi.mocked(SessionService.getAll);
  const revoke = vi.spyOn(SessionService, "revoke").mockImplementation(() => {
    getSessions.mockResolvedValue([currentSession]);

    return Promise.resolve();
  });
  const dialog = await openRevokeDialog();

  await dialog.getByRole("button", { name: "Sign out", exact: true }).click();

  await expect.element(page.getByText(successMessage, { exact: true })).toBeVisible();
  await expect.element(sessionHeading(otherDevice)).not.toBeInTheDocument();
  await expect.element(sessionHeading(currentDevice)).toBeVisible();
  expect(revoke).toHaveBeenCalledExactlyOnceWith(otherSession.id);
  expect(getSessions).toHaveBeenCalledTimes(2);
});

it("leaves both sessions intact when the user cancels", async () => {
  const revoke = vi.spyOn(SessionService, "revoke").mockResolvedValue(undefined);
  const dialog = await openRevokeDialog();

  await dialog.getByRole("button", { name: "Cancel", exact: true }).click();

  await expect.element(dialog).not.toBeInTheDocument();
  await expect.element(sessionHeading(otherDevice)).toBeVisible();
  await expect.element(sessionHeading(currentDevice)).toBeVisible();
  expect(revoke).not.toHaveBeenCalled();
});

it("keeps the session visible on failure and lets the user retry", async () => {
  const getSessions = vi.mocked(SessionService.getAll);
  const revoke = vi
    .spyOn(SessionService, "revoke")
    .mockRejectedValueOnce(new Error("Session revoke failed"))
    .mockImplementation(() => {
      getSessions.mockResolvedValue([currentSession]);

      return Promise.resolve();
    });

  const firstDialog = await openRevokeDialog();

  await firstDialog.getByRole("button", { name: "Sign out", exact: true }).click();
  await expect.element(page.getByText(errorMessage, { exact: true })).toBeVisible();
  await expect.element(sessionHeading(otherDevice)).toBeVisible();
  expect(revoke).toHaveBeenCalledExactlyOnceWith(otherSession.id);

  const retryDialog = await openRevokeDialog();

  await retryDialog.getByRole("button", { name: "Sign out", exact: true }).click();
  await expect.element(page.getByText(successMessage, { exact: true })).toBeVisible();
  await expect.element(sessionHeading(otherDevice)).not.toBeInTheDocument();
  expect(revoke.mock.calls).toEqual([[otherSession.id], [otherSession.id]]);
});
