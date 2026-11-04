import type { Session } from "@entities/session";

import { UserSessionRow } from "./user-session-row";
import { UserSessionsTableLayout } from "./user-sessions-table-layout";

interface UserSessionsTableProps {
  sessions: Session[];
  isFetching: boolean;
  disabled: boolean;
  onRevoke: (session: Session) => Promise<void>;
}

export const UserSessionsTable = ({ sessions, isFetching, disabled, onRevoke }: UserSessionsTableProps) => (
  <UserSessionsTableLayout isBusy={isFetching}>
    {sessions.map((session) => (
      <UserSessionRow key={session.id} disabled={disabled} onRevoke={onRevoke} session={session} />
    ))}
  </UserSessionsTableLayout>
);
