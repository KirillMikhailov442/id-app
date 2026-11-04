import { useTranslation } from "react-i18next";

import { useGetProfile } from "@entities/user";

import { mapProfileContent } from "../lib/map-profile-content";
import { ProfileError } from "./error/profile-error";
import { ProfileLoading } from "./loading/profile-loading";
import { PageContent } from "./page-content/page-content";

export const ProfilePage = () => {
  const { t, i18n } = useTranslation();
  const { data, isPending, isError, isFetching, refetch } = useGetProfile({
    staleTime: 0,
    throwOnError: false,
  });

  if (isPending) {
    return <ProfileLoading />;
  }

  if (isError) {
    return <ProfileError isRetrying={isFetching} onRetry={() => void refetch()} />;
  }

  const profile = mapProfileContent(data, t, i18n.language);

  return <PageContent profile={profile} />;
};
