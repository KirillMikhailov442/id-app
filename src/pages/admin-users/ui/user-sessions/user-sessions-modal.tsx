import { useTranslation } from "react-i18next";

import { ModalId, ResponsiveModal } from "@shared/modal";

import { UserSessionsPanel } from "./user-sessions-panel";

export const UserSessionsModal = () => {
  const { t } = useTranslation();

  return (
    <ResponsiveModal id={ModalId.AdminUserSessions} requiredParams>
      {({ isOpen, params }, setDismissDisabled) => ({
        title: t("adminUsers.sessions.title"),
        description: t("adminUsers.sessions.description", { email: params.email }),
        size: "xl",
        children: (
          <UserSessionsPanel key={params.id} open={isOpen} setDismissDisabled={setDismissDisabled} user={params} />
        ),
      })}
    </ResponsiveModal>
  );
};
