import type { SessionUser } from "@shared/api";
import { useModal } from "@shared/modal";

import { UserAppsModal } from "./user-apps/user-apps-modal";
import { UserDetails } from "./user-details/user-details";
import { UserEditor } from "./user-editor/user-editor";
import { UserSessionsModal } from "./user-sessions/user-sessions-modal";

interface AdminUsersModalsProps {
  appsUser: SessionUser | null;
  details: SessionUser | null;
  editor: SessionUser | null;
  sessionsUser: SessionUser | null;
}

export const AdminUsersModals = ({ appsUser, details, editor, sessionsUser }: AdminUsersModalsProps) => {
  const editorPresence = useModal({ isOpen: editor !== null, params: editor });
  const detailsPresence = useModal({ isOpen: details !== null, params: details });
  const sessionsPresence = useModal({ isOpen: sessionsUser !== null, params: sessionsUser });
  const appsPresence = useModal({ isOpen: appsUser !== null, params: appsUser });

  return (
    <>
      {appsPresence.mounted && appsPresence.params !== null && (
        <UserAppsModal
          key={appsPresence.params.id}
          onExitComplete={appsPresence.onExitComplete}
          open={appsPresence.isOpen}
          user={appsPresence.params}
        />
      )}
      {sessionsPresence.mounted && sessionsPresence.params !== null && (
        <UserSessionsModal
          key={sessionsPresence.params.id}
          onExitComplete={sessionsPresence.onExitComplete}
          open={sessionsPresence.isOpen}
          user={sessionsPresence.params}
        />
      )}
      {detailsPresence.mounted && detailsPresence.params !== null && (
        <UserDetails
          onExitComplete={detailsPresence.onExitComplete}
          open={detailsPresence.isOpen}
          user={detailsPresence.params}
        />
      )}
      {editorPresence.mounted && editorPresence.params !== null && (
        <UserEditor
          key={editorPresence.params.id}
          onExitComplete={editorPresence.onExitComplete}
          open={editorPresence.isOpen}
          user={editorPresence.params}
        />
      )}
    </>
  );
};
