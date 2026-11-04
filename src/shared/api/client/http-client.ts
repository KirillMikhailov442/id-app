import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";

import { jotaiStore } from "@shared/lib";

import { SessionModel } from "../session";
import { TokenRefreshService } from "../token-refresh";
import { HTTP_BASE_URL, HTTP_TIMEOUT_MS } from "./http-client.const";
import type { HttpRequestConfig, HttpRequestOptions } from "./types";

export class HttpClient {
  private readonly instance: AxiosInstance;
  public readonly tokenRefreshService: TokenRefreshService;

  public constructor(config: AxiosRequestConfig = {}) {
    this.instance = axios.create({
      baseURL: HTTP_BASE_URL,
      timeout: HTTP_TIMEOUT_MS,
      withCredentials: true,
      ...config,
    });
    this.tokenRefreshService = new TokenRefreshService(this.instance);
  }

  private request<TResponse, TBody = unknown>(config: HttpRequestConfig<TBody>): Promise<TResponse> {
    const { skipAuth = false, ...requestConfig } = config;
    const accessToken = skipAuth ? null : jotaiStore.get(SessionModel.accessTokenAtom);

    return this.send<TResponse, TBody>(requestConfig, accessToken).catch((error: unknown) =>
      this.tokenRefreshService.handleRequestError(error, {
        accessToken,
        skipAuth,
        retry: (token) => this.send<TResponse, TBody>(requestConfig, token),
      })
    );
  }

  public get<TResponse>(url: string, config: HttpRequestOptions = {}): Promise<TResponse> {
    return this.request<TResponse>({ ...config, method: "GET", url });
  }

  public post<TResponse, TBody = unknown>(
    url: string,
    data?: TBody,
    config: HttpRequestOptions<TBody> = {}
  ): Promise<TResponse> {
    return this.request<TResponse, TBody>({ ...config, method: "POST", url, data });
  }

  public put<TResponse, TBody = unknown>(
    url: string,
    data?: TBody,
    config: HttpRequestOptions<TBody> = {}
  ): Promise<TResponse> {
    return this.request<TResponse, TBody>({ ...config, method: "PUT", url, data });
  }

  public patch<TResponse, TBody = unknown>(
    url: string,
    data?: TBody,
    config: HttpRequestOptions<TBody> = {}
  ): Promise<TResponse> {
    return this.request<TResponse, TBody>({ ...config, method: "PATCH", url, data });
  }

  public delete<TResponse>(url: string, config: HttpRequestOptions = {}): Promise<TResponse> {
    return this.request<TResponse>({ ...config, method: "DELETE", url });
  }

  private async send<TResponse, TBody>(config: AxiosRequestConfig<TBody>, token: string | null): Promise<TResponse> {
    const headers = token === null ? config.headers : { ...config.headers, Authorization: `Bearer ${token}` };

    const response = await this.instance.request<TResponse, AxiosResponse<TResponse>, TBody>({ ...config, headers });

    return response.data;
  }
}

export const httpClient = new HttpClient();

export const tokenRefreshService = httpClient.tokenRefreshService;
