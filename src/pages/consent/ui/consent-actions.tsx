import { CheckCircle2, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@id-app/shadcn";

import { useConsent } from "../hooks/use-consent";
import s from "./consent-page.module.scss";

export const ConsentActions = () => {
  const { t } = useTranslation();
  const { decision, setDecision } = useConsent();
  const ResultIcon = decision === "allow" ? CheckCircle2 : XCircle;

  if (decision !== null) {
    return (
      <div className={s.result} role="status">
        <ResultIcon aria-hidden size={24} />
        <strong>{t(`consent.result.${decision}`)}</strong>
        <Button onClick={() => setDecision(null)} size="sm" variant="outline">
          {t("consent.reconsider")}
        </Button>
      </div>
    );
  }

  return (
    <div className={s.actions}>
      <Button onClick={() => setDecision("deny")} type="button" variant="outline">
        {t("consent.deny")}
      </Button>
      <Button onClick={() => setDecision("allow")} type="button">
        {t("consent.allow")}
      </Button>
    </div>
  );
};
