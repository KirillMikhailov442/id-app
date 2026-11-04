import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@id-app/shadcn";

import { useConsent } from "../hooks/use-consent";
import { ConsentErrorMessage } from "./consent-error-message";
import s from "./consent-page.module.scss";

export const ConsentActions = () => {
  const { t } = useTranslation();
  const { decision, isSubmitting, error, allow, deny } = useConsent();

  if (decision !== null) {
    return (
      <div className={s.result} role="status">
        <CheckCircle2 aria-hidden size={24} />
        <strong>{t(`consent.result.${decision}`)}</strong>
      </div>
    );
  }

  if (error !== null) {
    return <ConsentErrorMessage error={error} />;
  }

  return (
    <div>
      <div aria-busy={isSubmitting} className={s.actions}>
        <Button disabled={isSubmitting} onClick={deny} type="button" variant="outline">
          {t("consent.deny")}
        </Button>
        <Button
          disabled={isSubmitting}
          onClick={() => {
            void allow();
          }}
          type="button"
        >
          {t(isSubmitting ? "consent.submitting" : "consent.allow")}
        </Button>
      </div>
    </div>
  );
};
