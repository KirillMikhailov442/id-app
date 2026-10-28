import type { TFunction } from "i18next";

import type { SessionUser } from "@shared/api";
import { formatDate } from "@shared/lib";

import type { ProfileContentData } from "../types";

export const mapProfileContent = (user: SessionUser, t: TFunction, language: string): ProfileContentData => {
  const dateOptions = { language, fallback: t("profile.unavailable") };

  return {
    user,
    title: t("profile.title"),
    fullName: `${user.surname} ${user.name}`,
    emailStatus: {
      confirmed: user.emailConfirmed,
      label: t(user.emailConfirmed ? "profile.emailVerified" : "profile.emailUnverified"),
    },
    detailsTitle: t("profile.details"),
    fields: [
      { id: "name", label: t("profile.name"), value: user.name },
      { id: "surname", label: t("profile.surname"), value: user.surname },
      { id: "email", label: t("profile.email"), value: user.email },
      {
        id: "emailConfirmed",
        label: t("profile.emailStatus"),
        value: t(user.emailConfirmed ? "profile.confirmed" : "profile.unconfirmed"),
      },
      { id: "createdAt", label: t("profile.createdAt"), value: formatDate(user.createdAt, dateOptions) },
      { id: "updatedAt", label: t("profile.updatedAt"), value: formatDate(user.updatedAt, dateOptions) },
    ],
  };
};
