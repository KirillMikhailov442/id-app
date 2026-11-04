import { useTranslation } from "react-i18next";

import { Button } from "@id-app/shadcn";

import { ModalId } from "../../model/modal.const";
import { ModalService } from "../../service/modal.service";
import { ModalActions } from "../modal-actions";
import { ResponsiveModal } from "../responsive-modal";
import s from "./confirm-modal.module.scss";

export const ConfirmModal = () => {
  const { t } = useTranslation();

  return (
    <ResponsiveModal id={ModalId.Confirm}>
      {({ close, params }) => ({
        title: params?.title ?? t("confirm.title"),
        description: params?.description ?? t("confirm.description"),
        size: "s",
        children: (
          <>
            <ModalActions className={s.actions}>
              <Button onClick={close} type="button" variant="outline">
                {params?.cancel ?? t("confirm.cancel")}
              </Button>
              <Button onClick={() => ModalService.resolveConfirm("ok")} type="button">
                {params?.apply ?? t("confirm.apply")}
              </Button>
            </ModalActions>
          </>
        ),
      })}
    </ResponsiveModal>
  );
};
