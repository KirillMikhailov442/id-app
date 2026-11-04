import { useTranslation } from "react-i18next";

import type { SessionUser } from "@shared/api";
import { ModalActions, ResponsiveModal } from "@shared/modal";

import { Button } from "@id-app/shadcn";

import { useUserApps } from "../../hooks/use-user-apps";
import { mapUserRecordsContent } from "../../lib/map-user-records-content";
import { AdminUsersModel } from "../../model/admin-users.model";
import { UserAppsModalContent } from "./user-apps-modal-content";
import s from "./user-apps.module.scss";

interface UserAppsModalProps {
  user: SessionUser;
  open: boolean;
  onExitComplete: () => void;
}

export const UserAppsModal = ({ user, open, onExitComplete }: UserAppsModalProps) => {
  const { t } = useTranslation();
  const { query, isPageOutOfRange, setOffset } = useUserApps(user.id, open);

  return (
    <ResponsiveModal
      description={t("adminUsers.apps.description", { email: user.email })}
      onClose={AdminUsersModel.closeApps}
      onExitComplete={onExitComplete}
      open={open}
      size="xl"
      title={t("adminUsers.apps.title")}
    >
      <div className={s.content}>
        <UserAppsModalContent
          content={mapUserRecordsContent(query.data, "apps", t)}
          isError={query.isError}
          isFetching={query.isFetching}
          isPageOutOfRange={isPageOutOfRange}
          isPending={query.isPending}
          onPageChange={setOffset}
          onRetry={() => void query.refetch()}
        />
        <ModalActions>
          <Button onClick={AdminUsersModel.closeApps} type="button" variant="outline">
            {t("modal.close")}
          </Button>
        </ModalActions>
      </div>
    </ResponsiveModal>
  );
};
