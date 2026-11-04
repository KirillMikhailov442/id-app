import { expect, it, vi } from "vitest";
import { page } from "vitest/browser";

import { UserService } from "@entities/user";

import { AppRoute } from "@shared/config";

import { setupFormPage } from "./fixtures/form-page";
import { screenshotAdmin, screenshotList, screenshotUser } from "./fixtures/screenshot-data";

const openPage = setupFormPage();
const updatedEmail = "alicia@example.test";

it("prefills the selected user, displays a save error, and updates the table on retry", async () => {
  const users = vi.spyOn(UserService, "getAll").mockResolvedValue(screenshotList([screenshotUser]));
  const updatedUser = { ...screenshotUser, email: updatedEmail };
  const update = vi
    .spyOn(UserService, "update")
    .mockRejectedValueOnce(new Error("Save failed"))
    .mockImplementation(() => {
      users.mockResolvedValue(screenshotList([updatedUser]));

      return Promise.resolve(updatedUser);
    });

  openPage(AppRoute.AdminUsers, screenshotAdmin);
  await page.getByRole("button", { name: `Actions for ${screenshotUser.email}` }).click();
  await page.getByRole("menuitem", { name: "Edit profile" }).click();

  const dialog = page.getByRole("dialog", { name: "Edit profile" });
  const email = dialog.getByLabelText("Email", { exact: true });
  const save = dialog.getByRole("button", { name: "Save", exact: true });

  await expect.element(dialog.getByLabelText("First name", { exact: true })).toHaveValue(screenshotUser.name);
  await expect.element(email).toHaveValue(screenshotUser.email);
  await email.fill(updatedEmail);
  await save.click();
  await expect.element(dialog.getByRole("alert")).toHaveTextContent("Unable to save changes. Please try again.");
  await expect.element(email).toHaveValue(updatedEmail);

  await save.click();
  await expect.element(dialog).not.toBeInTheDocument();
  await expect.element(page.getByRole("cell", { name: updatedEmail, exact: true })).toBeVisible();
  expect(update).toHaveBeenLastCalledWith(screenshotUser.id, {
    name: screenshotUser.name,
    surname: screenshotUser.surname,
    email: updatedEmail,
  });
});
