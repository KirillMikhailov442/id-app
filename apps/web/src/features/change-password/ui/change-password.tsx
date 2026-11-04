import { useTranslation } from "react-i18next";

import { ModalId, ModalService } from "@shared/modal";

import { Button } from "@id-app/shadcn";

export const ChangePassword = () => {
  const { t } = useTranslation();

  return (
    <Button onClick={() => ModalService.openModal(ModalId.ChangePassword)} type="button" variant="outline">
      {t("security.password.change")}
    </Button>
  );
};
