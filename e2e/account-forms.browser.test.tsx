import { expect, it, vi } from "vitest";
import { page } from "vitest/browser";

import { SessionService } from "@entities/session";
import { UserService } from "@entities/user";

import { AppRoute } from "@shared/config";

import { formApiError } from "./fixtures/form-api-error";
import { setupFormPage } from "./fixtures/form-page";
import { screenshotUser } from "./fixtures/screenshot-data";

const openPage = setupFormPage();
const updatedName = "Alicia";
const passwords = { oldPassword: "Old123!", newPassword: "New123!" };

it("prefills the profile, retains edits on failure, and updates it on retry", async () => {
  vi.spyOn(UserService, "getProfile").mockResolvedValue(screenshotUser);

  const update = vi
    .spyOn(UserService, "updateProfile")
    .mockRejectedValueOnce(new Error("Save failed"))
    .mockResolvedValue({ ...screenshotUser, name: updatedName });

  openPage(AppRoute.Main, screenshotUser);
  await page.getByRole("button", { name: "Edit profile", exact: true }).click();

  const dialog = page.getByRole("dialog", { name: "Edit profile" });
  const firstName = dialog.getByLabelText("First name", { exact: true });
  const save = dialog.getByRole("button", { name: "Save", exact: true });

  await expect.element(firstName).toHaveValue(screenshotUser.name);
  await expect.element(dialog.getByLabelText("Last name", { exact: true })).toHaveValue(screenshotUser.surname);
  await expect.element(dialog.getByLabelText("Email", { exact: true })).toHaveValue(screenshotUser.email);
  await firstName.fill(updatedName);
  await save.click();
  await expect.element(dialog.getByRole("alert")).toHaveTextContent("Unable to save changes. Please try again.");
  await expect.element(firstName).toHaveValue(updatedName);

  await save.click();
  await expect.element(dialog).not.toBeInTheDocument();
  await expect.element(page.getByRole("heading", { name: "Morgan Alicia" })).toBeVisible();
  expect(update).toHaveBeenLastCalledWith({
    name: updatedName,
    surname: screenshotUser.surname,
    email: screenshotUser.email,
  });
});

it("shows the current-password error and closes the dialog after a successful retry", async () => {
  vi.spyOn(SessionService, "getAll").mockResolvedValue([]);

  const changePassword = vi
    .spyOn(UserService, "changePassword")
    .mockRejectedValueOnce(formApiError("INVALID_OLD_PASSWORD"))
    .mockResolvedValue(undefined);

  openPage(AppRoute.Security, screenshotUser);
  await page.getByRole("button", { name: "Change", exact: true }).click();

  const dialog = page.getByRole("dialog", { name: "Change password" });
  const current = dialog.getByLabelText("Current password", { exact: true });
  const submit = dialog.getByRole("button", { name: "Change password", exact: true });

  await current.fill("Wrong123!");
  await dialog.getByLabelText("New password", { exact: true }).fill(passwords.newPassword);
  await dialog.getByLabelText("Confirm new password", { exact: true }).fill(passwords.newPassword);
  await submit.click();
  await expect.element(current).toHaveAccessibleDescription("Current password is incorrect");

  await current.fill(passwords.oldPassword);
  await submit.click();

  await expect.element(dialog).not.toBeInTheDocument();
  await expect.element(page.getByText("Password changed", { exact: true })).toBeVisible();
  expect(changePassword.mock.calls).toEqual([[{ ...passwords, oldPassword: "Wrong123!" }], [passwords]]);
});
