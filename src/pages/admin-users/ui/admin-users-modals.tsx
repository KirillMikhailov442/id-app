import { UserAppsModal } from "./user-apps/user-apps-modal";
import { UserDetails } from "./user-details/user-details";
import { UserEditor } from "./user-editor/user-editor";
import { UserSessionsModal } from "./user-sessions/user-sessions-modal";

export const AdminUsersModals = () => (
  <>
    <UserAppsModal />
    <UserSessionsModal />
    <UserDetails />
    <UserEditor />
  </>
);
