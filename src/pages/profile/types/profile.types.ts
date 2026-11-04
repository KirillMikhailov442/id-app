import type { SessionUser } from "@shared/api";

import type { PROFILE_DETAIL_FIELDS } from "../model/profile.const";

export interface ProfileFieldData {
  id: (typeof PROFILE_DETAIL_FIELDS)[number];
  label: string;
  value: string;
}

export interface ProfileEmailStatus {
  confirmed: boolean;
  label: string;
}

export interface ProfileContentData {
  user: SessionUser;
  title: string;
  fullName: string;
  adminBadgeLabel: string | null;
  emailStatus: ProfileEmailStatus;
  detailsTitle: string;
  fields: ProfileFieldData[];
}
