import { useEffect } from "react";
import { useSearch } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";

import { toast } from "@id-app/shadcn";

import { ConsentService } from "../api/consent.service";
import { getConsentRedirectUrl } from "../lib/get-consent-redirect-url";
import { CONSENT_ROUTE_ID } from "../model/consent.const";
import { ConsentModel } from "../model/consent.model";

export const useConsent = () => {
  const { t } = useTranslation();
  const [decision] = useAtom(ConsentModel.decisionAtom);
  const [isSubmitting] = useAtom(ConsentModel.isSubmittingAtom);
  const [error] = useAtom(ConsentModel.errorAtom);
  const { client_id: clientId, redirect_uri: redirectUri, scope, state } = useSearch({ from: CONSENT_ROUTE_ID });

  useEffect(() => {
    ConsentModel.reset();
  }, [clientId, redirectUri, scope, state]);

  const allow = async (): Promise<void> => {
    if (!ConsentModel.beginSubmission()) return;

    try {
      if (!clientId || !scope.trim() || getConsentRedirectUrl(redirectUri) === null) {
        ConsentModel.setError("invalidRequest");

        return;
      }

      const { redirectUrl } = await ConsentService.authorize({
        clientId,
        redirectUri,
        scope,
        ...(state === undefined ? {} : { state }),
      });

      if (getConsentRedirectUrl(redirectUrl) === null) {
        toast.error(t("consent.authorizeError"));

        return;
      }

      window.location.assign(redirectUrl);
    } catch {
      toast.error(t("consent.authorizeError"));
    } finally {
      ConsentModel.finishSubmission();
    }
  };

  const deny = (): void => {
    if (!ConsentModel.beginSubmission()) return;

    try {
      const url = getConsentRedirectUrl(redirectUri);

      if (url === null) {
        ConsentModel.setError("invalidRequest");

        return;
      }

      url.searchParams.delete("code");
      url.searchParams.set("error", "access_denied");

      if (state !== undefined) {
        url.searchParams.set("state", state);
      }

      window.location.assign(url.toString());
    } catch {
      ConsentModel.setError("invalidRequest");
    } finally {
      ConsentModel.finishSubmission();
    }
  };

  return { decision, isSubmitting, error, allow, deny };
};
