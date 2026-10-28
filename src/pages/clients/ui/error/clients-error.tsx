import { AccountError } from "@widgets/account-error";

import { ClientsErrorIllustration } from "../illustrations/clients-error-illustration";

interface ClientsErrorProps {
  isRetrying: boolean;
  onRetry: () => void;
}

export const ClientsError = ({ isRetrying, onRetry }: ClientsErrorProps) => (
  <AccountError illustration={<ClientsErrorIllustration />} isRetrying={isRetrying} onRetry={onRetry} />
);
