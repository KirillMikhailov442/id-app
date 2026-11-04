import { createInstance } from "i18next";
import { describe, expect, it } from "vitest";

import { CLIENT_MAX_SCOPES, CLIENT_SECRET_MAX_LENGTH, CLIENT_SECRET_MIN_LENGTH } from "../model/clients.const";
import { createClientSchema } from "./client-schema";

const t = await createInstance().init({ lng: "en", resources: {} });
const scope = "openid";
const createSchema = createClientSchema(t, [scope], true);
const editSchema = createClientSchema(t, [scope], false);
const values = {
  name: "Orbit Notes",
  secret: "a".repeat(CLIENT_SECRET_MIN_LENGTH),
  location: "https://notes.example.test/callback",
  scopes: [scope],
};

describe("OAuth client validation", () => {
  it.each(["http", "https"])("accepts %s redirect URLs and trims fields", (protocol) => {
    const location = `${protocol}://notes.example.test/callback`;

    expect(createSchema.parse({ ...values, name: " Orbit Notes ", location: ` ${location} ` })).toEqual({
      ...values,
      location,
    });
  });

  it.each([
    "javascript:alert(1)",
    "https://user:pass@notes.example.test/callback",
    "https://notes.example.test/callback#fragment",
    "https://notes.example.test/call back",
    "/callback",
  ])("rejects the redirect URL %s", (location) => {
    const result = createSchema.safeParse({ ...values, location });

    expect(result.error?.issues).toContainEqual(expect.objectContaining({ path: ["location"] }));
  });

  it.each(["", "a".repeat(CLIENT_SECRET_MIN_LENGTH - 1), "a".repeat(CLIENT_SECRET_MAX_LENGTH + 1)])(
    "requires a secret of valid length when creating a client",
    (secret) => {
      const result = createSchema.safeParse({ ...values, secret });

      expect(result.error?.issues).toContainEqual(expect.objectContaining({ path: ["secret"] }));
    }
  );

  it("allows editing without a secret or scopes", () => {
    expect(editSchema.safeParse({ ...values, secret: "", scopes: [] }).success).toBe(true);
  });

  it.each([["unknown-scope"], Array<string>(CLIENT_MAX_SCOPES + 1).fill(scope)].map((scopes) => ({ scopes })))(
    "rejects unknown scopes and selections over the limit",
    ({ scopes }) => {
      const result = createSchema.safeParse({ ...values, scopes });

      expect(result.error?.issues).toContainEqual(expect.objectContaining({ path: ["scopes"] }));
    }
  );
});
