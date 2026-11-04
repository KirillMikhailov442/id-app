import { ModalId, useModal } from "@shared/modal";

import { EditProfileForm } from "./edit-profile-form";

export const EditProfileModal = () => {
  const { mounted, params: user, close, onExitComplete } = useModal(ModalId.ProfileEdit);

  if (!mounted || user === undefined) return null;

  return <EditProfileForm key={user.id} onClose={close} onExitComplete={onExitComplete} user={user} />;
};
