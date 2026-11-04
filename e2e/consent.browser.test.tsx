import { expect, it, vi } from "vitest";
import { commands, page } from "vitest/browser";

import { ConsentService } from "@pages/consent";

import { ClientService } from "@entities/client";

import { AppRoute } from "@shared/config";

import { setupFormPage } from "./fixtures/form-page";
import { screenshotClient, screenshotUser } from "./fixtures/screenshot-data";

const openPage = setupFormPage();
const callback = "https://notes.example.test/callback";
const state = "oauth-request-state";
const scope = screenshotClient.scopes.join(" ");
const clientId = screenshotClient.id;

const openConsent = (redirectUri: string) => {
  vi.spyOn(ClientService, "getById").mockResolvedValue(screenshotClient);

  const search = new URLSearchParams({ client_id: clientId, redirect_uri: redirectUri, scope, state });

  openPage(`${AppRoute.Consent}?${search}`, screenshotUser);
};

it("authorizes the requested scopes and navigates to the returned callback", async () => {
  const callbackWithCode = `${callback}?code=issued-code&state=${state}`;
  const authorize = vi.spyOn(ConsentService, "authorize").mockResolvedValue({ redirectUrl: callbackWithCode });

  openConsent(callback);
  await expect.element(page.getByRole("button", { name: "Allow", exact: true })).toBeEnabled();

  expect(await commands.captureOAuthCallback(callback, "Allow")).toBe(callbackWithCode);
  expect(authorize).toHaveBeenCalledExactlyOnceWith({ clientId, redirectUri: callback, scope, state });
});

it("returns access_denied and the original state without authorizing the client", async () => {
  const authorize = vi.spyOn(ConsentService, "authorize").mockResolvedValue({ redirectUrl: callback });

  openConsent(`${callback}?code=stale-code`);
  await expect.element(page.getByRole("button", { name: "Deny", exact: true })).toBeEnabled();

  const result = new URL(await commands.captureOAuthCallback(callback, "Deny"));

  expect(result.searchParams.get("error")).toBe("access_denied");
  expect(result.searchParams.get("state")).toBe(state);
  expect(result.searchParams.has("code")).toBe(false);
  expect(authorize).not.toHaveBeenCalled();
});

it("rejects an unsafe callback before sending an authorization request", async () => {
  const authorize = vi.spyOn(ConsentService, "authorize").mockResolvedValue({ redirectUrl: callback });

  openConsent("javascript:alert(1)");
  await page.getByRole("button", { name: "Allow", exact: true }).click();

  await expect.element(page.getByRole("alert")).toBeVisible();
  expect(authorize).not.toHaveBeenCalled();
});
