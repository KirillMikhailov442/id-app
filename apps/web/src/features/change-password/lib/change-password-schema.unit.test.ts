import { createInstance } from "i18next";
import { describe, expect, it } from "vitest";

import { createChangePasswordSchema } from "./change-password-schema";

const t = await createInstance().init({ lng: "en", resources: {} });
const schema = createChangePasswordSchema(t);
const passwords = {
  currentPassword: "Old123!",
  newPassword: "New123!",
  confirmPassword: "New123!",
};

describe("change password validation", () => {
  it("accepts a new password and matching confirmation", () => {
    expect(schema.parse(passwords)).toEqual(passwords);
  });

  it.each([
    ["currentPassword", "", "login.validation.passwordRequired"],
    ["currentPassword", passwords.newPassword, "security.password.samePassword"],
    ["confirmPassword", "Other123!", "security.password.mismatch"],
  ])("rejects invalid %s value %j", (field, value, message) => {
    const result = schema.safeParse({ ...passwords, [field]: value });

    expect(result.error?.issues).toContainEqual(expect.objectContaining({ message }));
  });
});
