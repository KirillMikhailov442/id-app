import { useTranslation } from "react-i18next";

import { ModalId, ResponsiveModal } from "@shared/modal";

import { UserEditorForm } from "./user-editor-form";

export const UserEditor = () => {
  const { t } = useTranslation();

  return (
    <ResponsiveModal id={ModalId.AdminUserEdit} requiredParams>
      {({ params }, setDismissDisabled) => ({
        title: t("adminUsers.edit"),
        description: t("adminUsers.editDescription", { email: params.email }),
        children: <UserEditorForm key={params.id} setDismissDisabled={setDismissDisabled} user={params} />,
      })}
    </ResponsiveModal>
  );
};
