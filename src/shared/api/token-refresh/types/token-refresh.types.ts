export interface FailedRequest {
  retry: (accessToken: string) => void;
  reject: (error: unknown) => void;
}

export interface FailedRequestContext<TResponse> {
  accessToken: string | null;
  skipAuth: boolean;
  retry: (accessToken: string) => Promise<TResponse>;
}
