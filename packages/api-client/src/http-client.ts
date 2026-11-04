import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import type { HttpClientAuth, HttpRequestConfig, HttpRequestOptions } from "./types";

export class HttpClient {
  public constructor(
    private readonly instance: AxiosInstance,
    private readonly auth?: HttpClientAuth
  ) {}

  private request<TResponse, TBody = unknown>(config: HttpRequestConfig<TBody>): Promise<TResponse> {
    const { skipAuth = false, ...requestConfig } = config;
    const auth = this.auth;
    const accessToken = skipAuth ? null : (auth?.getAccessToken() ?? null);
    const request = this.send<TResponse, TBody>(requestConfig, accessToken);

    if (auth === undefined) {
      return request;
    }

    return request.catch((error: unknown) =>
      auth.handleRequestError(error, {
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
