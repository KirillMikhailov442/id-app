import { Copy } from "lucide-react";
import { useTranslation } from "react-i18next";

import { ModalActions, ResponsiveModal } from "@shared/modal";

import { Button, Input, toast } from "@id-app/shadcn";

import { ClientsModel } from "../../model/clients.model";
import type { ClientCredentials } from "../../types";
import s from "./client-credentials-modal.module.scss";

interface ClientCredentialsModalProps {
  credentials: ClientCredentials;
  open: boolean;
  onExitComplete: () => void;
}

export const ClientCredentialsModal = ({ credentials, open, onExitComplete }: ClientCredentialsModalProps) => {
  const { t } = useTranslation();

  const copy = async (value: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(t("clients.credentials.copied"));
    } catch {
      toast.error(t("clients.credentials.copyError"));
    }
  };

  const fields = [
    { name: t("clients.credentials.clientId"), value: credentials.id },
    { name: t("clients.credentials.clientSecret"), value: credentials.secret },
  ];

  return (
    <ResponsiveModal
      description={t("clients.credentials.description")}
      onClose={ClientsModel.closeCredentials}
      onExitComplete={onExitComplete}
      open={open}
      title={t("clients.credentials.title")}
    >
      <div className={s.fields}>
        {fields.map(({ name, value }) => (
          <div key={name} className={s.field}>
            <span className={s.label}>{name}</span>
            <div className={s.control}>
              <Input className={s.input} readOnly spellCheck={false} value={value} />
              <Button
                aria-label={t("clients.credentials.copy")}
                className={s.copy}
                onClick={() => void copy(value)}
                size="icon"
                type="button"
                variant="ghost"
              >
                <Copy aria-hidden="true" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <ModalActions>
        <Button onClick={ClientsModel.closeCredentials} type="button">
          {t("clients.credentials.done")}
        </Button>
      </ModalActions>
    </ResponsiveModal>
  );
};
