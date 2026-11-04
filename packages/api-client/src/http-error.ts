import { AxiosError, isAxiosError } from "axios";

import { HttpStatus } from "./http-status.const";
import type { ExceptionResponse } from "./types";

export const isSessionExpiredError = (error: unknown): boolean =>
  isAxiosError(error) &&
  (error.response?.status === HttpStatus.Unauthorized || error.response?.status === HttpStatus.Forbidden);

export const getApiErrorCode = (error: unknown): string | null => {
  if (!isAxiosError<ExceptionResponse>(error)) {
    return null;
  }

  return error.response?.data.code ?? null;
};

export const isNetworkError = (error: unknown): boolean => {
  if (!isAxiosError(error) || error.code === AxiosError.ERR_CANCELED) {
    return false;
  }

  return (
    error.code === AxiosError.ERR_NETWORK ||
    error.code === AxiosError.ECONNABORTED ||
    error.code === AxiosError.ETIMEDOUT ||
    (error.response !== undefined && error.response.status >= HttpStatus.InternalServerError)
  );
};
