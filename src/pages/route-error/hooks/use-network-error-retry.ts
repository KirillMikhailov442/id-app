import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export const useNetworkErrorRetry = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isRetrying, setIsRetrying] = useState(false);
  const [hasRetryError, setHasRetryError] = useState(false);

  const retry = async () => {
    setIsRetrying(true);
    setHasRetryError(false);

    try {
      await queryClient.resetQueries({ predicate: (query) => query.state.status === "error" });
      await router.invalidate();
    } catch (error) {
      console.error("Failed to retry the route", error);
      setHasRetryError(true);
    } finally {
      setIsRetrying(false);
    }
  };

  return { retry, isRetrying, hasRetryError };
};
