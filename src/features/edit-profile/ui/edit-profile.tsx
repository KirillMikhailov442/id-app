import { Pencil } from "lucide-react";
import { useTranslation } from "react-i18next";

import type { SessionUser } from "@shared/api";
import { ModalId, ModalService } from "@shared/modal";

import { Button } from "@id-app/shadcn";

interface EditProfileProps {
  user: SessionUser;
  disabled?: boolean;
}

export const EditProfile = ({ user, disabled = false }: EditProfileProps) => {
  const { t } = useTranslation();

  return (
    <Button
      disabled={disabled}
      onClick={() => ModalService.openModal(ModalId.ProfileEdit, user)}
      type="button"
      variant="outline"
    >
      <Pencil aria-hidden="true" />
      {t("profile.edit.button")}
    </Button>
  );
};
