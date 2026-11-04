import { ErrorComponent, type ErrorComponentProps } from "@tanstack/react-router";

import { isNetworkError } from "@shared/api";

import { NetworkErrorPage } from "./network-error-page";

interface RouteErrorPageProps extends ErrorComponentProps {}

export const RouteErrorPage = ({ error }: RouteErrorPageProps) => {
  if (isNetworkError(error)) {
    return <NetworkErrorPage />;
  }

  return <ErrorComponent error={error} />;
};
