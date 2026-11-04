import { CircleCheck, CircleX } from "lucide-react";

import { Badge } from "@id-app/shadcn";

import type { ProfileEmailStatus } from "../../../types";
import s from "./profile-header.module.scss";

interface ProfileHeaderProps {
  fullName: string;
  adminBadgeLabel: string | null;
  emailStatus: ProfileEmailStatus;
}

export const ProfileHeader = ({ fullName, adminBadgeLabel, emailStatus }: ProfileHeaderProps) => {
  const StatusIcon = emailStatus.confirmed ? CircleCheck : CircleX;

  return (
    <header className={s.header}>
      <h1 className={s.name}>{fullName}</h1>
      <div className={s.badges}>
        {adminBadgeLabel !== null && <Badge>{adminBadgeLabel}</Badge>}
        <Badge variant={emailStatus.confirmed ? "secondary" : "outline"}>
          <StatusIcon aria-hidden="true" />
          {emailStatus.label}
        </Badge>
      </div>
    </header>
  );
};
