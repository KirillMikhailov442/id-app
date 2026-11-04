import { createInstance } from "i18next";
import { describe, expect, it } from "vitest";

import { MAX_SURNAME_LENGTH } from "@entities/user";

import { PROFILE_EMAIL_MAX_LENGTH } from "../model/edit-profile.const";
import { createEditProfileSchema } from "./edit-profile-schema";

const t = await createInstance().init({ lng: "en", resources: {} });
const schema = createEditProfileSchema(t);
const values = { name: "Alice", surname: "Morgan", email: "alice@example.test" };

describe("edit-profile validation", () => {
  it("trims all fields before validating them", () => {
    expect(schema.parse({ name: " Alice ", surname: " Morgan ", email: " alice@example.test " })).toEqual(values);
  });

  it.each([
    ["name", " "],
    ["surname", "A".repeat(MAX_SURNAME_LENGTH + 1)],
    ["email", "invalid"],
    ["email", values.email.padStart(PROFILE_EMAIL_MAX_LENGTH + 1, "a")],
  ])("rejects an invalid %s", (field, value) => {
    const result = schema.safeParse({ ...values, [field]: value });

    expect(result.error?.issues).toContainEqual(expect.objectContaining({ path: [field] }));
  });
});
