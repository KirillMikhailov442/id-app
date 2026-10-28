import { useState } from "react";
import { useQueryClient, useQueryErrorResetBoundary } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export const useAccountErrorRetry = (reset: () => void) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const queryErrorResetBoundary = useQueryErrorResetBoundary();
  const [isRetrying, setIsRetrying] = useState(false);

  const retry = async (): Promise<void> => {
    setIsRetrying(true);

    try {
      queryErrorResetBoundary.reset();
      await queryClient.resetQueries({ predicate: (query) => query.state.status === "error" });
      await router.invalidate();
      reset();
    } catch (error) {
      console.error("Failed to reload account page", error);
    } finally {
      setIsRetrying(false);
    }
  };

  return { retry, isRetrying };
};
