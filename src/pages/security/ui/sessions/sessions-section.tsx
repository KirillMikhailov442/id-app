import { useTranslation } from "react-i18next";

import { useGetSessions } from "@entities/session";

import { Button, Card, CardContent } from "@id-app/shadcn";

import { useConfirmSessionLogout } from "../../hooks/use-confirm-session-logout";
import { SessionsList } from "./sessions-list";
import { SessionsSectionError } from "./sessions-section-error";
import { SessionsSectionLoading } from "./sessions-section-loading";
import s from "./sessions-section.module.scss";

export const SessionsSection = () => {
  const { t } = useTranslation();
  const { confirmLogout, isPending: isLoggingOut } = useConfirmSessionLogout();
  const { data: sessions, isPending, isError, isFetching, refetch } = useGetSessions();

  if (isPending) return <SessionsSectionLoading />;

  if (isError) {
    return <SessionsSectionError isRetrying={isFetching} onRetry={() => void refetch()} />;
  }

  return (
    <Card className={s.card}>
      <CardContent className={s.cardContent}>
        <h2 className={s.heading}>{t("security.sessions")}</h2>
        <SessionsList sessions={sessions} />
        <div className={s.actions}>
          <Button
            className={s.danger}
            disabled={sessions.length === 0 || isLoggingOut}
            onClick={() => void confirmLogout()}
            type="button"
            variant="outline"
          >
            {t(isLoggingOut ? "settings.loggingOut" : "security.endAllSessions")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
