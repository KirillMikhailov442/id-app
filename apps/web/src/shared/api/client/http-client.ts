import { HttpClient as ApiClient } from "@id-app/api-client";
import axios, { type AxiosRequestConfig } from "axios";

import { jotaiStore } from "@shared/lib";

import { SessionModel } from "../session";
import { TokenRefreshService } from "../token-refresh";
import { HTTP_BASE_URL, HTTP_TIMEOUT_MS } from "./http-client.const";

export class HttpClient extends ApiClient {
  public readonly tokenRefreshService: TokenRefreshService;

  public constructor(config: AxiosRequestConfig = {}) {
    const instance = axios.create({
      baseURL: HTTP_BASE_URL,
      timeout: HTTP_TIMEOUT_MS,
      withCredentials: true,
      ...config,
    });
    const refreshService = new TokenRefreshService(instance);

    super(instance, {
      getAccessToken: () => jotaiStore.get(SessionModel.accessTokenAtom),
      handleRequestError: (error, context) => refreshService.handleRequestError(error, context),
    });

    this.tokenRefreshService = refreshService;
  }
}

export const httpClient = new HttpClient();

export const tokenRefreshService = httpClient.tokenRefreshService;
