import { createInstance } from "i18next";
import { describe, expect, it } from "vitest";

import { createLoginSchema } from "./login-schema";

const t = await createInstance().init({ lng: "en", resources: {} });
const schema = createLoginSchema(t);
const credentials = { email: "user@example.test", password: "Valid123!" };

describe("login validation", () => {
  it("accepts valid credentials", () => {
    expect(schema.parse(credentials)).toEqual(credentials);
  });

  it.each([
    ["email", "", "login.validation.emailRequired"],
    ["email", "invalid", "login.validation.email"],
    ["password", "", "login.validation.passwordRequired"],
    ["password", "lowercase123!", "login.validation.passwordPattern"],
  ])("rejects %s value %j", (field, value, message) => {
    const result = schema.safeParse({ ...credentials, [field]: value });

    expect(result.error?.issues).toContainEqual(expect.objectContaining({ path: [field], message }));
  });
});
