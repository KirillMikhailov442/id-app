import { beforeEach, expect, it, vi } from "vitest";
import { page } from "vitest/browser";

import { ClientService } from "@entities/client";
import { ScopeService } from "@entities/scope";

import { AppRoute } from "@shared/config";

import { setupFormPage } from "./fixtures/form-page";
import { screenshotClient, screenshotList, screenshotUser } from "./fixtures/screenshot-data";

const openPage = setupFormPage();
const location = "https://notes.example.test/callback";
const secret = "test-client-secret";
const scope = { id: "scope-openid", name: "openid", createdAt: screenshotClient.createdAt };
const scopeFailure = "Client saved, but scopes could not be assigned. Submit again to retry.";

beforeEach(() => {
  vi.spyOn(ScopeService, "getAll").mockResolvedValue([scope]);
});

it("retries saving scopes without creating a second client and shows its credentials", async () => {
  const clients = vi.spyOn(ClientService, "getMine").mockResolvedValue(screenshotList([]));
  const created = { ...screenshotClient, location, scopes: [] };
  const create = vi.spyOn(ClientService, "create").mockImplementation(() => {
    clients.mockResolvedValue(screenshotList([created]));

    return Promise.resolve(created);
  });
  const update = vi.spyOn(ClientService, "update").mockResolvedValue(created);
  const setScopes = vi
    .spyOn(ClientService, "setScopes")
    .mockRejectedValueOnce(new Error("Scope update failed"))
    .mockResolvedValue([scope]);

  openPage(AppRoute.Clients, screenshotUser);
  await page.getByRole("button", { name: "Create client", exact: true }).click();

  const dialog = page.getByRole("dialog", { name: "New client" });
  const submit = dialog.getByRole("button", { name: "Create client", exact: true });

  await dialog.getByLabelText("Name", { exact: true }).fill(created.name);
  await dialog.getByLabelText("Client secret", { exact: true }).fill(secret);
  await dialog.getByLabelText("Redirect URL", { exact: true }).fill(location);
  await dialog.getByText(scope.name, { exact: true }).click();
  await submit.click();

  await expect.element(dialog.getByRole("alert")).toHaveTextContent(scopeFailure);
  await expect.element(dialog.getByRole("checkbox", { name: scope.name, exact: true })).toBeChecked();
  await submit.click();

  const credentials = page.getByRole("dialog", { name: "Client created" });
  const selectedScopes = { id: created.id, scopes: [scope.name] };

  await expect.element(credentials.getByRole("textbox").nth(0)).toHaveValue(created.id);
  await expect.element(credentials.getByRole("textbox").nth(1)).toHaveValue(secret);
  expect(create).toHaveBeenCalledExactlyOnceWith({ name: created.name, location, secret });
  expect(update).toHaveBeenCalledExactlyOnceWith({ id: created.id, data: { name: created.name, location } });
  expect(setScopes.mock.calls).toEqual([[selectedScopes], [selectedScopes]]);
});

it("prefills an existing client and saves its redirect URL and scopes", async () => {
  const client = { ...screenshotClient, scopes: [scope.name] };
  const updated = { ...client, location, scopes: [] };
  const clients = vi.spyOn(ClientService, "getMine").mockResolvedValue(screenshotList([client]));
  const update = vi.spyOn(ClientService, "update").mockImplementation(() => {
    clients.mockResolvedValue(screenshotList([updated]));

    return Promise.resolve(updated);
  });
  const setScopes = vi.spyOn(ClientService, "setScopes").mockResolvedValue([]);

  openPage(AppRoute.Clients, screenshotUser);
  await page.getByRole("button", { name: `Actions for ${client.name}`, exact: true }).click();
  await page.getByRole("menuitem", { name: "Edit", exact: true }).click();

  const dialog = page.getByRole("dialog", { name: "Edit client" });
  const redirect = dialog.getByLabelText("Redirect URL", { exact: true });
  const checkbox = dialog.getByRole("checkbox", { name: scope.name, exact: true });

  await expect.element(dialog.getByLabelText("Name", { exact: true })).toHaveValue(client.name);
  await expect.element(redirect).toHaveValue(client.location ?? "");
  await expect.element(checkbox).toBeChecked();
  await redirect.fill(location);
  await dialog.getByText(scope.name, { exact: true }).click();
  await dialog.getByRole("button", { name: "Save", exact: true }).click();

  await expect.element(dialog).not.toBeInTheDocument();
  await expect.element(page.getByText(location, { exact: true })).toBeVisible();
  expect(update).toHaveBeenCalledExactlyOnceWith({ id: client.id, data: { name: client.name, location } });
  expect(setScopes).toHaveBeenCalledExactlyOnceWith({ id: client.id, scopes: [] });
});
