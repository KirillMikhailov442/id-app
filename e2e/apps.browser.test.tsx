import { expect, it, vi } from "vitest";
import { page } from "vitest/browser";

import { OAuthGrantService, OAuthGrantStatus } from "@entities/oauth-grant";

import { AppRoute } from "@shared/config";

import { setupFormPage } from "./fixtures/form-page";
import { screenshotGrant, screenshotUser } from "./fixtures/screenshot-data";

const openPage = setupFormPage();

it("keeps access active after a failed revoke and shows it as revoked after retry", async () => {
  const grants = vi.spyOn(OAuthGrantService, "getOwn").mockResolvedValue([screenshotGrant]);
  const revoke = vi
    .spyOn(OAuthGrantService, "revokeOwn")
    .mockRejectedValueOnce(new Error("Revoke failed"))
    .mockImplementation(() => {
      grants.mockResolvedValue([
        { ...screenshotGrant, status: OAuthGrantStatus.Revoked, revokedAt: screenshotGrant.createdAt },
      ]);

      return Promise.resolve();
    });

  openPage(AppRoute.Apps, screenshotUser);

  const action = page.getByRole("button", { name: `Revoke access for ${screenshotGrant.clientName}`, exact: true });
  const dialog = page.getByRole("dialog", { name: "Revoke access?" });
  const confirm = dialog.getByRole("button", { name: "Revoke access", exact: true });

  await action.click();
  await confirm.click();
  await expect.element(page.getByText("Unable to revoke access. Please try again.")).toBeVisible();
  await expect.element(action).toBeEnabled();

  await action.click();
  await confirm.click();
  await expect.element(page.getByText("Revoked", { exact: true })).toBeVisible();
  await expect.element(action).not.toBeInTheDocument();
  expect(revoke.mock.calls).toEqual([[screenshotGrant.id], [screenshotGrant.id]]);
});
