import { useTranslation } from "react-i18next";

import { ModalId, ResponsiveModal } from "@shared/modal";

import { ChangePasswordForm } from "./change-password-form";

export const ChangePasswordModal = () => {
  const { t } = useTranslation();

  return (
    <ResponsiveModal id={ModalId.ChangePassword}>
      {({ close }, setDismissDisabled) => ({
        title: t("security.password.title"),
        description: t("security.password.modalDescription"),
        size: "s",
        children: <ChangePasswordForm close={close} setDismissDisabled={setDismissDisabled} />,
      })}
    </ResponsiveModal>
  );
};
