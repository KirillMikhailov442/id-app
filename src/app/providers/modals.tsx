import { useEffect, type ReactNode } from "react";
import { useRouter } from "@tanstack/react-router";

import { ChangePasswordModal } from "@features/change-password";
import { EditProfileModal } from "@features/edit-profile";

import { useSession } from "@shared/api";
import { ConfirmModal, ModalService, useModalHistory } from "@shared/modal";

interface ModalsProviderProps {
  children: ReactNode;
}

export const ModalsProvider = ({ children }: ModalsProviderProps) => {
  const { user } = useSession();
  const { history } = useRouter();

  useModalHistory(history);

  useEffect(() => () => ModalService.closeAll(), [user?.id]);

  return (
    <>
      {children}
      <EditProfileModal />
      <ChangePasswordModal />
      <ConfirmModal />
    </>
  );
};
