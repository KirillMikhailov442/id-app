import { useState } from "react";
import clsx from "clsx";
import { UserRound } from "lucide-react";

import { getAvatarUrl } from "../lib/get-avatar-url";
import s from "./user-avatar.module.scss";

interface UserAvatarProps {
  avatar: string;
  className?: string;
}

export const UserAvatar = ({ avatar, className }: UserAvatarProps) => {
  const [failedAvatar, setFailedAvatar] = useState<string | null>(null);
  const avatarUrl = getAvatarUrl(avatar);

  if (avatarUrl !== null && avatarUrl !== failedAvatar) {
    return (
      <img alt="" className={clsx(s.image, className)} onError={() => setFailedAvatar(avatarUrl)} src={avatarUrl} />
    );
  }

  return <UserRound aria-hidden className={clsx(s.image, className)} />;
};
