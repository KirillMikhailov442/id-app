import { useTranslation } from "react-i18next";

import { ModalActions, ModalId, ResponsiveModal } from "@shared/modal";

import { Button } from "@id-app/shadcn";

import { AdminUsersModel } from "../../model/admin-users.model";
import { UserAppsModalContent } from "./user-apps-modal-content";
import s from "./user-apps.module.scss";

export const UserAppsModal = () => {
  const { t } = useTranslation();

  return (
    <ResponsiveModal id={ModalId.AdminUserApps} requiredParams>
      {({ isOpen, params }) => ({
        title: t("adminUsers.apps.title"),
        description: t("adminUsers.apps.description", { email: params.email }),
        size: "xl",
        children: (
          <div key={params.id} className={s.content}>
            <UserAppsModalContent open={isOpen} userId={params.id} />
            <ModalActions>
              <Button onClick={AdminUsersModel.closeApps} type="button" variant="outline">
                {t("modal.close")}
              </Button>
            </ModalActions>
          </div>
        ),
      })}
    </ResponsiveModal>
  );
};
