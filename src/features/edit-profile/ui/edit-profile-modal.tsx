import { ModalId, useModal, useModalPresence } from "@shared/modal";

import { EditProfileForm } from "./edit-profile-form";

export const EditProfileModal = () => {
  const { isOpen, params: user, close } = useModal(ModalId.ProfileEdit);

  const presence = useModalPresence(isOpen, user);

  if (!presence.mounted || presence.value === undefined) return null;

  return (
    <EditProfileForm
      key={presence.value.id}
      onClose={close}
      onExitComplete={presence.onExitComplete}
      user={presence.value}
    />
  );
};
