import { useTranslation } from "react-i18next";

import { ModalId, ResponsiveModal } from "@shared/modal";

import { EditProfileForm } from "./edit-profile-form";

export const EditProfileModal = () => {
  const { t } = useTranslation();

  return (
    <ResponsiveModal id={ModalId.ProfileEdit} requiredParams>
      {({ close, params: user }, setDismissDisabled) => ({
        title: t("profile.edit.title"),
        description: t("profile.edit.description"),
        size: "s",
        children: <EditProfileForm key={user.id} onClose={close} setDismissDisabled={setDismissDisabled} user={user} />,
      })}
    </ResponsiveModal>
  );
};
