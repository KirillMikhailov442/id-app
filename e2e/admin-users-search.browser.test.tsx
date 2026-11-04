import { expect, it, vi } from "vitest";
import { page } from "vitest/browser";

import { ADMIN_USERS_PAGE_SIZE } from "@pages/admin-users";

import { UserService } from "@entities/user";

import { AppRoute } from "@shared/config";

import { setupFormPage } from "./fixtures/form-page";
import { screenshotAdmin, screenshotUser } from "./fixtures/screenshot-data";

const openPage = setupFormPage();
const search = "missing user";
const nextUser = { ...screenshotUser, id: "user-page-two", email: "page-two@example.test" };

it("resets the offset when a search is entered on a later page", async () => {
  const getUsers = vi.spyOn(UserService, "getAll").mockImplementation((params) => {
    const { offset = 0, search: term } = params ?? {};
    const items = term === undefined ? [offset === 0 ? screenshotUser : nextUser] : [];

    return Promise.resolve({
      items,
      meta: { offset, limit: ADMIN_USERS_PAGE_SIZE, total: term === undefined ? ADMIN_USERS_PAGE_SIZE + 1 : 0 },
    });
  });

  openPage(AppRoute.AdminUsers, screenshotAdmin);

  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect.element(page.getByRole("cell", { name: nextUser.email })).toBeVisible();
  await page.getByRole("searchbox", { name: "Search users" }).fill(search);
  await expect.element(page.getByText("No users found", { exact: true })).toBeVisible();
  expect(getUsers.mock.lastCall?.[0]).toEqual({ limit: ADMIN_USERS_PAGE_SIZE, offset: 0, search });
});
