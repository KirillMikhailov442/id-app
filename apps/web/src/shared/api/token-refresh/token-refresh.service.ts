import { HttpStatus, isSessionExpiredError, type FailedRequestContext } from "@id-app/api-client";
import { CanceledError, isAxiosError, type AxiosInstance } from "axios";

import { jotaiStore } from "@shared/lib";

import { SessionModel, type TokenResponse } from "../session";
import { TOKEN_REFRESH_PATH } from "./token-refresh.const";
import type { FailedRequest } from "./types";

export class TokenRefreshService {
  private readonly client: AxiosInstance;
  private refreshRequest: Promise<string> | null = null;
  private failedRequests: FailedRequest[] = [];

  public constructor(client: AxiosInstance) {
    this.client = client;
  }

  public async handleRequestError<TResponse>(
    error: unknown,
    { accessToken, skipAuth, retry }: FailedRequestContext<TResponse>
  ): Promise<TResponse> {
    if (!isAxiosError(error) || error.response?.status !== HttpStatus.Unauthorized || skipAuth) {
      throw error;
    }

    const currentToken = jotaiStore.get(SessionModel.accessTokenAtom);
    const retryRequest = (token: string) => this.retryRequest(retry, token);

    return currentToken !== null && currentToken !== accessToken
      ? retryRequest(currentToken)
      : this.enqueue(retryRequest);
  }

  public refreshTokens = (): Promise<string> => {
    if (this.refreshRequest !== null) {
      return this.refreshRequest;
    }

    this.refreshRequest = this.refreshAccessToken().then(
      (accessToken) => {
        this.refreshRequest = null;
        this.resolveQueue(accessToken);

        return accessToken;
      },
      (error: unknown) => {
        this.refreshRequest = null;
        this.rejectQueue(error);

        throw error;
      }
    );

    return this.refreshRequest;
  };

  public enqueue<TResponse>(retry: (accessToken: string) => Promise<TResponse>): Promise<TResponse> {
    return new Promise<TResponse>((resolve, reject) => {
      this.failedRequests.push({
        retry: (accessToken) => {
          void Promise.resolve()
            .then(() => retry(accessToken))
            .then(resolve, reject);
        },
        reject,
      });
      void this.refreshTokens().catch(reject);
    });
  }

  private async retryRequest<TResponse>(
    retry: (accessToken: string) => Promise<TResponse>,
    accessToken: string
  ): Promise<TResponse> {
    try {
      return await retry(accessToken);
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response?.status === HttpStatus.Unauthorized &&
        jotaiStore.get(SessionModel.accessTokenAtom) === accessToken
      ) {
        SessionModel.logout();
      }

      throw error;
    }
  }

  private resolveQueue(accessToken: string): void {
    const requests = this.failedRequests;
    this.failedRequests = [];

    for (const request of requests) {
      request.retry(accessToken);
    }
  }

  private rejectQueue(error: unknown): void {
    const requests = this.failedRequests;
    this.failedRequests = [];

    for (const request of requests) {
      request.reject(error);
    }
  }

  private async refreshAccessToken(): Promise<string> {
    const previousToken = jotaiStore.get(SessionModel.accessTokenAtom);
    const previousUser = jotaiStore.get(SessionModel.userAtom);
    const isCurrentSession = () =>
      jotaiStore.get(SessionModel.accessTokenAtom) === previousToken &&
      jotaiStore.get(SessionModel.userAtom) === previousUser;

    try {
      const { data } = await this.client.post<TokenResponse>(TOKEN_REFRESH_PATH, undefined, { withCredentials: true });

      if (!isCurrentSession()) {
        throw new CanceledError("Session changed during token refresh");
      }

      SessionModel.setAccessToken(data.accessToken);

      return data.accessToken;
    } catch (error) {
      if (isCurrentSession() && isSessionExpiredError(error)) {
        SessionModel.logout();
      }

      throw error;
    }
  }
}
