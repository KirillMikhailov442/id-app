import type { AxiosRequestConfig } from "axios";

export interface HttpRequestConfig<TBody = unknown> extends AxiosRequestConfig<TBody> {
  skipAuth?: boolean;
}

export type HttpRequestOptions<TBody = unknown> = Omit<HttpRequestConfig<TBody>, "url" | "method" | "data">;

export interface FailedRequestContext<TResponse> {
  accessToken: string | null;
  skipAuth: boolean;
  retry: (accessToken: string) => Promise<TResponse>;
}

export interface HttpClientAuth {
  getAccessToken(): string | null;
  handleRequestError<TResponse>(error: unknown, context: FailedRequestContext<TResponse>): Promise<TResponse>;
}
