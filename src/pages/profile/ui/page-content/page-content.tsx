import { UserAvatar } from "@entities/user";

import type { ProfileContentData } from "../../types";
import { ProfileActions } from "./actions/profile-actions";
import { ProfileHeader } from "./header/profile-header";
import s from "./page-content.module.scss";
import { ProfileSummary } from "./summary/profile-summary";

interface PageContentProps {
  profile: ProfileContentData;
}

export const PageContent = ({ profile }: PageContentProps) => (
  <section aria-label={profile.title} className={s.page}>
    <div className={s.profile}>
      <UserAvatar className={s.avatar} userId={profile.user.id} />
      <div className={s.information}>
        <ProfileHeader emailStatus={profile.emailStatus} fullName={profile.fullName} />
        <ProfileSummary fields={profile.fields} title={profile.detailsTitle} />
        <ProfileActions user={profile.user} />
      </div>
    </div>
  </section>
);
