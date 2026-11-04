import { expect, it, vi } from "vitest";
import { page } from "vitest/browser";

import { AuthService, type RegisterResponse } from "@entities/auth";
import { UserService } from "@entities/user";

import { AppRoute } from "@shared/config";

import { formApiError } from "./fixtures/form-api-error";
import { setupFormPage } from "./fixtures/form-page";
import { screenshotUser } from "./fixtures/screenshot-data";

const openPage = setupFormPage();
const registration = {
  name: screenshotUser.name,
  surname: screenshotUser.surname,
  email: screenshotUser.email,
  password: "Valid123!",
};

const fillRegistration = async () => {
  await page.getByLabelText("First name", { exact: true }).fill(registration.name);
  await page.getByLabelText("Last name", { exact: true }).fill(registration.surname);
  await page.getByLabelText("Email", { exact: true }).fill(registration.email);
  await page.getByLabelText("Password", { exact: true }).fill(registration.password);
};

const submit = () => page.getByRole("button", { name: "Create account", exact: true }).click();

it("signs up and prevents duplicate submission while the request is pending", async () => {
  let completeRegistration!: (response: RegisterResponse) => void;
  const request = new Promise<RegisterResponse>((resolve) => {
    completeRegistration = resolve;
  });
  const register = vi.spyOn(AuthService, "register").mockReturnValue(request);

  vi.spyOn(UserService, "getProfile").mockResolvedValue(screenshotUser);

  const testRouter = openPage(AppRoute.Register);

  try {
    await fillRegistration();
    await submit();
    await expect.element(page.getByRole("button", { name: "Creating account...", exact: true })).toBeDisabled();
    expect(register).toHaveBeenCalledExactlyOnceWith(registration);
  } finally {
    completeRegistration({ accessToken: "registered-token", user: screenshotUser });
  }

  await expect.element(page.getByRole("heading", { name: "Morgan Alice" })).toBeVisible();
  expect(testRouter.state.location.pathname).toBe(AppRoute.Main);
});

it("shows the email field error when the address is already registered", async () => {
  vi.spyOn(AuthService, "register").mockRejectedValue(formApiError("EMAIL_ALREADY_REGISTERED"));

  const testRouter = openPage(AppRoute.Register);

  await fillRegistration();
  await submit();

  const email = page.getByLabelText("Email", { exact: true });

  await expect.element(email).toHaveAccessibleDescription("This email is already registered");
  await expect.element(email).toHaveValue(registration.email);
  expect(testRouter.state.location.pathname).toBe(AppRoute.Register);
});
