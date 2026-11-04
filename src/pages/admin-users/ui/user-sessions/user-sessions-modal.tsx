import { useTranslation } from "react-i18next";

import type { SessionUser } from "@shared/api";
import { ModalActions, ResponsiveModal } from "@shared/modal";

import { Button } from "@id-app/shadcn";

import { useUserSessionActions } from "../../hooks/use-user-session-actions";
import { useUserSessions } from "../../hooks/use-user-sessions";
import { mapUserRecordsContent } from "../../lib/map-user-records-content";
import { AdminUsersModel } from "../../model/admin-users.model";
import { UserSessionsModalContent } from "./user-sessions-modal-content";
import s from "./user-sessions.module.scss";

interface UserSessionsModalProps {
  user: SessionUser;
  open: boolean;
  onExitComplete: () => void;
}

export const UserSessionsModal = ({ user, open, onExitComplete }: UserSessionsModalProps) => {
  const { t } = useTranslation();
  const { query, isPageOutOfRange, setOffset } = useUserSessions(user.id, open);
  const { confirmRevoke, isPending } = useUserSessionActions(user.id);
  const disabled = isPending || query.isFetching;

  return (
    <ResponsiveModal
      description={t("adminUsers.sessions.description", { email: user.email })}
      dismissDisabled={isPending}
      onClose={() => {
        if (!isPending) AdminUsersModel.closeSessions();
      }}
      onExitComplete={onExitComplete}
      open={open}
      size="xl"
      title={t("adminUsers.sessions.title")}
    >
      <div className={s.content}>
        <UserSessionsModalContent
          content={mapUserRecordsContent(query.data, "sessions", t)}
          disabled={disabled}
          isError={query.isError}
          isFetching={query.isFetching}
          isPageOutOfRange={isPageOutOfRange}
          isPending={query.isPending}
          onPageChange={setOffset}
          onRetry={() => void query.refetch()}
          onRevoke={confirmRevoke}
        />
        <ModalActions>
          <Button
            disabled={disabled || query.data === undefined || query.data.meta.total === 0}
            onClick={() => void confirmRevoke()}
            type="button"
            variant="destructive"
          >
            {t("adminUsers.sessions.revokeAll")}
          </Button>
          <Button disabled={isPending} onClick={AdminUsersModel.closeSessions} type="button" variant="outline">
            {t("modal.close")}
          </Button>
        </ModalActions>
      </div>
    </ResponsiveModal>
  );
};
