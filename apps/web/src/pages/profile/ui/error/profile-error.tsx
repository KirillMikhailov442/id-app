import { AccountError } from "@widgets/account-error";

import { ProfileErrorIllustration } from "../illustrations/profile-error-illustration";

interface ProfileErrorProps {
  isRetrying: boolean;
  onRetry: () => void;
}

export const ProfileError = ({ isRetrying, onRetry }: ProfileErrorProps) => (
  <AccountError illustration={<ProfileErrorIllustration />} isRetrying={isRetrying} onRetry={onRetry} />
);
