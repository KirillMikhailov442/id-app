import { CONSENT_UNSAFE_REDIRECT_PROTOCOLS } from "../model/consent.const";

export const getConsentRedirectUrl = (redirectUri: string): URL | null => {
  try {
    const url = new URL(redirectUri);

    return CONSENT_UNSAFE_REDIRECT_PROTOCOLS.includes(url.protocol) ? null : url;
  } catch {
    return null;
  }
};
