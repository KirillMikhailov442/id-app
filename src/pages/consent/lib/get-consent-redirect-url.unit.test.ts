import { describe, expect, it } from "vitest";

import { CONSENT_UNSAFE_REDIRECT_PROTOCOLS } from "../model/consent.const";
import { getConsentRedirectUrl } from "./get-consent-redirect-url";

describe("OAuth consent redirect", () => {
  it.each(["https://notes.example.test/callback?from=login", "notes-app://callback"])(
    "preserves the callback URL %s",
    (url) => {
      expect(getConsentRedirectUrl(url)?.href).toBe(url);
    }
  );

  it.each([...CONSENT_UNSAFE_REDIRECT_PROTOCOLS.map((protocol) => `${protocol}callback`), "", "/callback"])(
    "rejects the unsafe or invalid callback %j",
    (url) => {
      expect(getConsentRedirectUrl(url)).toBeNull();
    }
  );
});
