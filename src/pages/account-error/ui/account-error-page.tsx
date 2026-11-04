import type { ErrorComponentProps } from "@tanstack/react-router";

import { AccountError, useAccountErrorRetry } from "@widgets/account-error";

import { AccountErrorIllustration } from "./illustrations/account-error-illustration";

interface AccountErrorPageProps extends ErrorComponentProps {}

export const AccountErrorPage = ({ reset }: AccountErrorPageProps) => {
  const { retry, isRetrying } = useAccountErrorRetry(reset);

  return (
    <AccountError illustration={<AccountErrorIllustration />} isRetrying={isRetrying} onRetry={() => void retry()} />
  );
};
