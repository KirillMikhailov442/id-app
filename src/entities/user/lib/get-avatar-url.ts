import { HTTP_BASE_URL } from "@shared/api";

export const getAvatarUrl = (avatar: string | undefined): string | null => {
  if (avatar === undefined || avatar.trim() === "") {
    return null;
  }

  if (!URL.canParse(HTTP_BASE_URL)) {
    return avatar;
  }

  if (!URL.canParse(avatar, HTTP_BASE_URL)) {
    return null;
  }

  return new URL(avatar, HTTP_BASE_URL).href;
};
