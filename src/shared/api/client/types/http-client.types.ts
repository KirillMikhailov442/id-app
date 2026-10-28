import type { AxiosRequestConfig } from "axios";

export interface HttpRequestConfig<TBody = unknown> extends AxiosRequestConfig<TBody> {
  skipAuth?: boolean;
}

export type HttpRequestOptions<TBody = unknown> = Omit<HttpRequestConfig<TBody>, "url" | "method" | "data">;
