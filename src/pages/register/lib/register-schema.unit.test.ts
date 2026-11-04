import { createInstance } from "i18next";
import { describe, expect, it } from "vitest";

import { MAX_NAME_LENGTH, MAX_PASSWORD_LENGTH } from "@entities/user";

import { createRegisterSchema } from "./register-schema";

const t = await createInstance().init({ lng: "en", resources: {} });
const schema = createRegisterSchema(t);
const registration = {
  name: "Alice",
  surname: "Smith",
  email: "alice@example.test",
  password: "Valid123!",
};

describe("registration validation", () => {
  it("trims the name, surname and email", () => {
    expect(
      schema.parse({
        ...registration,
        name: " Alice ",
        surname: " Smith ",
        email: " alice@example.test ",
      })
    ).toEqual(registration);
  });

  it.each([
    ["name", "A".repeat(MAX_NAME_LENGTH + 1)],
    ["surname", "   "],
    ["email", "invalid"],
    ["password", registration.password.padEnd(MAX_PASSWORD_LENGTH + 1, "a")],
  ])("rejects invalid %s", (field, value) => {
    const result = schema.safeParse({ ...registration, [field]: value });

    expect(result.error?.issues).toContainEqual(expect.objectContaining({ path: [field] }));
  });
});
